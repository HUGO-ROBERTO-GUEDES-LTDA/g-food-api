-- =============================================
-- Migration 007: Estoque (Insumos e Receitas)
-- =============================================

CREATE TABLE insumos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurante_id UUID NOT NULL REFERENCES restaurantes(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  unidade TEXT NOT NULL, -- kg, litro, unidade, grama, ml
  estoque_atual NUMERIC(10, 3) DEFAULT 0,
  estoque_minimo NUMERIC(10, 3) DEFAULT 0,
  custo_unitario NUMERIC(10, 2) DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Receita: relacao item do cardapio <-> insumos
CREATE TABLE receitas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_cardapio_id UUID NOT NULL REFERENCES itens_cardapio(id) ON DELETE CASCADE,
  insumo_id UUID NOT NULL REFERENCES insumos(id) ON DELETE CASCADE,
  quantidade NUMERIC(10, 3) NOT NULL,
  UNIQUE(item_cardapio_id, insumo_id)
);

-- Movimentos de estoque (historico)
CREATE TABLE movimentos_estoque (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  insumo_id UUID NOT NULL REFERENCES insumos(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('entrada', 'saida', 'ajuste', 'consumo')),
  quantidade NUMERIC(10, 3) NOT NULL,
  motivo TEXT,
  pedido_id UUID REFERENCES pedidos(id),
  usuario_id UUID REFERENCES usuarios(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger: decrementar estoque ao marcar item do pedido como "entregue"
CREATE OR REPLACE FUNCTION decrementar_estoque_item()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'entregue' AND OLD.status != 'entregue' THEN
    INSERT INTO movimentos_estoque (insumo_id, tipo, quantidade, motivo, pedido_id)
    SELECT
      r.insumo_id,
      'consumo',
      r.quantidade * NEW.quantidade,
      'Consumo automatico - Pedido',
      NEW.pedido_id
    FROM receitas r
    WHERE r.item_cardapio_id = NEW.item_cardapio_id;

    -- Atualizar estoque atual
    UPDATE insumos i
    SET
      estoque_atual = estoque_atual - (r.quantidade * NEW.quantidade),
      updated_at = now()
    FROM receitas r
    WHERE r.insumo_id = i.id
      AND r.item_cardapio_id = NEW.item_cardapio_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_decrementar_estoque
  AFTER UPDATE ON itens_pedido
  FOR EACH ROW
  WHEN (NEW.status = 'entregue' AND OLD.status != 'entregue')
  EXECUTE FUNCTION decrementar_estoque_item();

-- Indexes
CREATE INDEX idx_insumos_restaurante ON insumos(restaurante_id);
CREATE INDEX idx_receitas_item ON receitas(item_cardapio_id);
CREATE INDEX idx_receitas_insumo ON receitas(insumo_id);
CREATE INDEX idx_movimentos_estoque_insumo ON movimentos_estoque(insumo_id);
CREATE INDEX idx_movimentos_estoque_pedido ON movimentos_estoque(pedido_id);
