-- =============================================
-- Migration 001: Restaurantes e Usuarios
-- Gabriels PDVs - Sistema PDV para Restaurantes
-- =============================================

-- Restaurante
CREATE TABLE restaurantes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  cnpj TEXT UNIQUE,
  endereco TEXT,
  telefone TEXT,
  logo_url TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Usuarios (auth customizado - login por CPF)
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurante_id UUID NOT NULL REFERENCES restaurantes(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'gerente', 'garcom', 'cozinheiro')),
  senha_hash TEXT NOT NULL,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(restaurante_id, cpf)
);

-- Indexes
CREATE INDEX idx_usuarios_restaurante ON usuarios(restaurante_id);
CREATE INDEX idx_usuarios_cpf ON usuarios(cpf);
CREATE INDEX idx_usuarios_role ON usuarios(role);
