-- =============================================
-- Migration 008: RLS e Policies
-- =============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE restaurantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE mesas ENABLE ROW LEVEL SECURITY;
ALTER TABLE caixas ENABLE ROW LEVEL SECURITY;
ALTER TABLE movimentos_caixa ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_cardapio ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_pedido ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE insumos ENABLE ROW LEVEL SECURITY;
ALTER TABLE receitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE movimentos_estoque ENABLE ROW LEVEL SECURITY;

-- =============================================
-- Policies para acesso publico (cardapio online)
-- =============================================

-- Categorias: leitura publica (ativas)
CREATE POLICY "categorias_leitura_publica" ON categorias
  FOR SELECT TO anon
  USING (ativo = true);

-- Itens do cardapio: leitura publica (disponiveis)
CREATE POLICY "itens_cardapio_leitura_publica" ON itens_cardapio
  FOR SELECT TO anon
  USING (disponivel = true);

-- Pedidos online: inserir como anonimo
CREATE POLICY "pedidos_online_insert" ON pedidos
  FOR INSERT TO anon
  WITH CHECK (tipo = 'online');

-- Pedidos online: leitura por codigo de acompanhamento
CREATE POLICY "pedidos_online_select" ON pedidos
  FOR SELECT TO anon
  USING (codigo_acompanhamento IS NOT NULL AND tipo = 'online');

-- Itens pedido online: inserir como anonimo
CREATE POLICY "itens_pedido_online_insert" ON itens_pedido
  FOR INSERT TO anon
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM pedidos
      WHERE pedidos.id = pedido_id AND pedidos.tipo = 'online'
    )
  );

-- Itens pedido online: leitura
CREATE POLICY "itens_pedido_online_select" ON itens_pedido
  FOR SELECT TO anon
  USING (
    EXISTS (
      SELECT 1 FROM pedidos
      WHERE pedidos.id = pedido_id
        AND pedidos.tipo = 'online'
        AND pedidos.codigo_acompanhamento IS NOT NULL
    )
  );

-- Restaurante: leitura publica (para exibir no cardapio online)
CREATE POLICY "restaurantes_leitura_publica" ON restaurantes
  FOR SELECT TO anon
  USING (ativo = true);

-- =============================================
-- NOTA: O acesso autenticado do sistema usa
-- service_role key que bypassa RLS automaticamente.
-- As policies acima sao apenas para o cardapio online.
-- =============================================
