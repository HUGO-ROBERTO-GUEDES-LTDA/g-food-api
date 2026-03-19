-- =============================================
-- Migration 006: Pagamentos
-- =============================================

CREATE TABLE pagamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id UUID NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  caixa_id UUID REFERENCES caixas(id),
  metodo TEXT NOT NULL
    CHECK (metodo IN ('dinheiro', 'cartao_credito', 'cartao_debito', 'pix')),
  valor NUMERIC(10, 2) NOT NULL,
  valor_recebido NUMERIC(10, 2),
  troco NUMERIC(10, 2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pendente'
    CHECK (status IN ('pendente', 'confirmado', 'cancelado')),
  referencia TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger: ao confirmar pagamento, registrar movimento no caixa
CREATE OR REPLACE FUNCTION registrar_pagamento_caixa()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'confirmado' AND NEW.caixa_id IS NOT NULL THEN
    INSERT INTO movimentos_caixa (caixa_id, tipo, valor, descricao, usuario_id)
    VALUES (
      NEW.caixa_id,
      'entrada',
      NEW.valor,
      'Pagamento pedido #' || (SELECT numero FROM pedidos WHERE id = NEW.pedido_id),
      NULL
    );

    -- Atualizar total de vendas do caixa
    UPDATE caixas
    SET valor_total_vendas = COALESCE(valor_total_vendas, 0) + NEW.valor
    WHERE id = NEW.caixa_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_pagamento_caixa
  AFTER INSERT OR UPDATE ON pagamentos
  FOR EACH ROW
  WHEN (NEW.status = 'confirmado')
  EXECUTE FUNCTION registrar_pagamento_caixa();

-- Indexes
CREATE INDEX idx_pagamentos_pedido ON pagamentos(pedido_id);
CREATE INDEX idx_pagamentos_caixa ON pagamentos(caixa_id);
CREATE INDEX idx_pagamentos_metodo ON pagamentos(metodo);
CREATE INDEX idx_pagamentos_status ON pagamentos(status);
CREATE INDEX idx_pagamentos_created ON pagamentos(created_at);
