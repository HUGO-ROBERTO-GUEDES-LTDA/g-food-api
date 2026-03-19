-- =============================================
-- Migration 002: Mesas
-- =============================================

CREATE TABLE mesas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurante_id UUID NOT NULL REFERENCES restaurantes(id) ON DELETE CASCADE,
  numero INTEGER NOT NULL,
  capacidade INTEGER DEFAULT 4,
  status TEXT NOT NULL DEFAULT 'disponivel'
    CHECK (status IN ('disponivel', 'ocupada', 'reservada', 'suja')),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(restaurante_id, numero)
);

-- Indexes
CREATE INDEX idx_mesas_restaurante ON mesas(restaurante_id);
CREATE INDEX idx_mesas_status ON mesas(restaurante_id, status);
