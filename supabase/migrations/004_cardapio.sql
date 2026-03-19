-- =============================================
-- Migration 004: Cardapio (Categorias e Itens)
-- =============================================

CREATE TABLE categorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurante_id UUID NOT NULL REFERENCES restaurantes(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  descricao TEXT,
  ordem INTEGER DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE itens_cardapio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurante_id UUID NOT NULL REFERENCES restaurantes(id) ON DELETE CASCADE,
  categoria_id UUID NOT NULL REFERENCES categorias(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco NUMERIC(10, 2) NOT NULL,
  imagem_url TEXT,
  disponivel BOOLEAN DEFAULT true,
  tempo_preparo_min INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_categorias_restaurante ON categorias(restaurante_id);
CREATE INDEX idx_categorias_ordem ON categorias(restaurante_id, ordem);
CREATE INDEX idx_itens_cardapio_restaurante ON itens_cardapio(restaurante_id);
CREATE INDEX idx_itens_cardapio_categoria ON itens_cardapio(categoria_id);
CREATE INDEX idx_itens_cardapio_disponivel ON itens_cardapio(disponivel);
