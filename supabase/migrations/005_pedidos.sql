-- =============================================
-- Migration 005: Pedidos e Itens de Pedido
-- =============================================

-- Sequencia para numero do pedido do dia
CREATE SEQUENCE pedido_numero_seq START 1;

CREATE TABLE pedidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurante_id UUID NOT NULL REFERENCES restaurantes(id) ON DELETE CASCADE,
  mesa_id UUID REFERENCES mesas(id),
  garcom_id UUID REFERENCES usuarios(id),
  caixa_id UUID REFERENCES caixas(id),
  numero INTEGER NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'mesa'
    CHECK (tipo IN ('mesa', 'balcao', 'online')),
  status TEXT NOT NULL DEFAULT 'rascunho'
    CHECK (status IN (
      'rascunho', 'confirmado', 'preparando', 'pronto',
      'servido', 'saiu_entrega', 'entregue', 'fechado', 'cancelado'
    )),
  observacoes TEXT,
  -- Campos para pedido online
  cliente_cpf TEXT,
  cliente_telefone TEXT,
  cliente_nome TEXT,
  codigo_acompanhamento TEXT UNIQUE,
  -- Valores
  subtotal NUMERIC(10, 2) DEFAULT 0,
  desconto NUMERIC(10, 2) DEFAULT 0,
  total NUMERIC(10, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE itens_pedido (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id UUID NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  item_cardapio_id UUID NOT NULL REFERENCES itens_cardapio(id),
  quantidade INTEGER NOT NULL DEFAULT 1,
  preco_unitario NUMERIC(10, 2) NOT NULL,
  observacoes TEXT,
  status TEXT NOT NULL DEFAULT 'pendente'
    CHECK (status IN ('pendente', 'preparando', 'pronto', 'entregue', 'cancelado')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger para recalcular total do pedido automaticamente
CREATE OR REPLACE FUNCTION recalcular_total_pedido()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE pedidos SET
    subtotal = (
      SELECT COALESCE(SUM(preco_unitario * quantidade), 0)
      FROM itens_pedido
      WHERE pedido_id = COALESCE(NEW.pedido_id, OLD.pedido_id)
        AND status != 'cancelado'
    ),
    total = (
      SELECT COALESCE(SUM(preco_unitario * quantidade), 0)
      FROM itens_pedido
      WHERE pedido_id = COALESCE(NEW.pedido_id, OLD.pedido_id)
        AND status != 'cancelado'
    ) - COALESCE(
      (SELECT desconto FROM pedidos WHERE id = COALESCE(NEW.pedido_id, OLD.pedido_id)),
      0
    ),
    updated_at = now()
  WHERE id = COALESCE(NEW.pedido_id, OLD.pedido_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_recalcular_total
  AFTER INSERT OR UPDATE OR DELETE ON itens_pedido
  FOR EACH ROW EXECUTE FUNCTION recalcular_total_pedido();

-- Funcao para gerar numero sequencial do pedido por dia
CREATE OR REPLACE FUNCTION gerar_numero_pedido(p_restaurante_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_numero INTEGER;
BEGIN
  SELECT COALESCE(MAX(numero), 0) + 1
  INTO v_numero
  FROM pedidos
  WHERE restaurante_id = p_restaurante_id
    AND created_at::date = CURRENT_DATE;
  RETURN v_numero;
END;
$$ LANGUAGE plpgsql;

-- Indexes
CREATE INDEX idx_pedidos_restaurante ON pedidos(restaurante_id);
CREATE INDEX idx_pedidos_mesa ON pedidos(mesa_id);
CREATE INDEX idx_pedidos_garcom ON pedidos(garcom_id);
CREATE INDEX idx_pedidos_caixa ON pedidos(caixa_id);
CREATE INDEX idx_pedidos_status ON pedidos(status);
CREATE INDEX idx_pedidos_tipo ON pedidos(tipo);
CREATE INDEX idx_pedidos_created ON pedidos(created_at);
CREATE INDEX idx_pedidos_codigo ON pedidos(codigo_acompanhamento);
CREATE INDEX idx_itens_pedido_pedido ON itens_pedido(pedido_id);
CREATE INDEX idx_itens_pedido_item ON itens_pedido(item_cardapio_id);
CREATE INDEX idx_itens_pedido_status ON itens_pedido(status);
