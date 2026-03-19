-- =============================================
-- Migration 003: Caixa
-- =============================================

CREATE TABLE caixas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurante_id UUID NOT NULL REFERENCES restaurantes(id) ON DELETE CASCADE,
  aberto_por UUID NOT NULL REFERENCES usuarios(id),
  fechado_por UUID REFERENCES usuarios(id),
  valor_abertura NUMERIC(10, 2) NOT NULL DEFAULT 0,
  valor_fechamento NUMERIC(10, 2),
  valor_total_vendas NUMERIC(10, 2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'aberto' CHECK (status IN ('aberto', 'fechado')),
  observacoes TEXT,
  aberto_em TIMESTAMPTZ DEFAULT now(),
  fechado_em TIMESTAMPTZ
);

CREATE TABLE movimentos_caixa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caixa_id UUID NOT NULL REFERENCES caixas(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('entrada', 'saida', 'sangria', 'reforco')),
  valor NUMERIC(10, 2) NOT NULL,
  descricao TEXT,
  usuario_id UUID REFERENCES usuarios(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_caixas_restaurante ON caixas(restaurante_id);
CREATE INDEX idx_caixas_status ON caixas(restaurante_id, status);
CREATE INDEX idx_caixas_aberto_em ON caixas(aberto_em);
CREATE INDEX idx_movimentos_caixa ON movimentos_caixa(caixa_id);
