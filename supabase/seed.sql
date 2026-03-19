-- =============================================
-- Seed: Dados iniciais para desenvolvimento
-- =============================================

-- Restaurante de exemplo
INSERT INTO restaurantes (id, nome, cnpj, endereco, telefone)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Gabriels Restaurante',
  '12345678000199',
  'Rua Exemplo, 123 - Centro',
  '(11) 99999-9999'
);

-- Usuario admin (CPF: 00000000000, senha: 00000000000)
-- Hash bcrypt de '00000000000'
INSERT INTO usuarios (id, restaurante_id, nome, cpf, role, senha_hash)
VALUES (
  '00000000-0000-0000-0000-000000000010',
  '00000000-0000-0000-0000-000000000001',
  'Administrador',
  '00000000000',
  'admin',
  '$2a$10$xVqYLGefRC5mPRF4UPrB2upwYXRCGMNQ6JMgNEpRvjNE3dCgNMhfC'
);

-- Usuario garcom de exemplo (CPF: 11111111111, senha: 11111111111)
INSERT INTO usuarios (id, restaurante_id, nome, cpf, role, senha_hash)
VALUES (
  '00000000-0000-0000-0000-000000000011',
  '00000000-0000-0000-0000-000000000001',
  'Garçom Demo',
  '11111111111',
  'garcom',
  '$2a$10$xVqYLGefRC5mPRF4UPrB2upwYXRCGMNQ6JMgNEpRvjNE3dCgNMhfC'
);

-- Usuario cozinheiro de exemplo (CPF: 22222222222, senha: 22222222222)
INSERT INTO usuarios (id, restaurante_id, nome, cpf, role, senha_hash)
VALUES (
  '00000000-0000-0000-0000-000000000012',
  '00000000-0000-0000-0000-000000000001',
  'Cozinheiro Demo',
  '22222222222',
  'cozinheiro',
  '$2a$10$xVqYLGefRC5mPRF4UPrB2upwYXRCGMNQ6JMgNEpRvjNE3dCgNMhfC'
);

-- Mesas de exemplo (10 mesas)
INSERT INTO mesas (restaurante_id, numero, capacidade) VALUES
  ('00000000-0000-0000-0000-000000000001', 1, 2),
  ('00000000-0000-0000-0000-000000000001', 2, 2),
  ('00000000-0000-0000-0000-000000000001', 3, 4),
  ('00000000-0000-0000-0000-000000000001', 4, 4),
  ('00000000-0000-0000-0000-000000000001', 5, 4),
  ('00000000-0000-0000-0000-000000000001', 6, 6),
  ('00000000-0000-0000-0000-000000000001', 7, 6),
  ('00000000-0000-0000-0000-000000000001', 8, 8),
  ('00000000-0000-0000-0000-000000000001', 9, 8),
  ('00000000-0000-0000-0000-000000000001', 10, 10);

-- Categorias do cardapio
INSERT INTO categorias (id, restaurante_id, nome, ordem) VALUES
  ('00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000001', 'Entradas', 1),
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'Pratos Principais', 2),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'Acompanhamentos', 3),
  ('00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000001', 'Sobremesas', 4),
  ('00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000001', 'Bebidas', 5),
  ('00000000-0000-0000-0000-000000000105', '00000000-0000-0000-0000-000000000001', 'Bebidas Alcoólicas', 6);

-- Itens do cardapio de exemplo
INSERT INTO itens_cardapio (restaurante_id, categoria_id, nome, descricao, preco, disponivel, tempo_preparo_min) VALUES
  -- Entradas
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000100', 'Bruschetta', 'Pão italiano com tomate, manjericão e azeite', 18.90, true, 10),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000100', 'Bolinho de Bacalhau', '6 unidades de bolinho de bacalhau artesanal', 24.90, true, 15),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000100', 'Caldo Verde', 'Caldo verde tradicional com linguiça', 16.90, true, 10),
  -- Pratos Principais
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000101', 'Filé Mignon', 'Filé mignon grelhado com molho madeira', 59.90, true, 25),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000101', 'Salmão Grelhado', 'Salmão grelhado com legumes na manteiga', 54.90, true, 20),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000101', 'Risoto de Camarão', 'Risoto cremoso com camarão e açafrão', 49.90, true, 30),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000101', 'Picanha na Brasa', 'Picanha na brasa com farofa e vinagrete', 65.90, true, 25),
  -- Acompanhamentos
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000102', 'Arroz Branco', 'Porção de arroz branco', 8.90, true, 5),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000102', 'Batata Frita', 'Porção de batata frita crocante', 14.90, true, 10),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000102', 'Farofa Especial', 'Farofa com bacon e ovos', 12.90, true, 8),
  -- Sobremesas
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000103', 'Petit Gateau', 'Bolo quente de chocolate com sorvete', 22.90, true, 12),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000103', 'Pudim', 'Pudim de leite condensado', 14.90, true, 5),
  -- Bebidas
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000104', 'Refrigerante Lata', 'Coca-Cola, Guaraná ou Sprite', 6.90, true, 2),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000104', 'Suco Natural', 'Laranja, limão, maracujá ou abacaxi', 9.90, true, 5),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000104', 'Água Mineral', '500ml com ou sem gás', 4.90, true, 1),
  -- Bebidas Alcoólicas
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000105', 'Cerveja Heineken', 'Long neck 330ml', 12.90, true, 2),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000105', 'Caipirinha', 'Caipirinha de limão', 16.90, true, 5),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000105', 'Taça de Vinho', 'Vinho tinto ou branco da casa', 19.90, true, 2);

-- Insumos de exemplo
INSERT INTO insumos (restaurante_id, nome, unidade, estoque_atual, estoque_minimo, custo_unitario) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Filé Mignon', 'kg', 20.000, 5.000, 89.90),
  ('00000000-0000-0000-0000-000000000001', 'Salmão', 'kg', 10.000, 3.000, 79.90),
  ('00000000-0000-0000-0000-000000000001', 'Camarão', 'kg', 8.000, 2.000, 69.90),
  ('00000000-0000-0000-0000-000000000001', 'Arroz', 'kg', 50.000, 10.000, 5.90),
  ('00000000-0000-0000-0000-000000000001', 'Batata', 'kg', 30.000, 8.000, 4.90),
  ('00000000-0000-0000-0000-000000000001', 'Coca-Cola Lata', 'unidade', 100.000, 24.000, 2.50),
  ('00000000-0000-0000-0000-000000000001', 'Cerveja Heineken', 'unidade', 80.000, 24.000, 5.50),
  ('00000000-0000-0000-0000-000000000001', 'Limão', 'kg', 5.000, 2.000, 6.90),
  ('00000000-0000-0000-0000-000000000001', 'Chocolate', 'kg', 3.000, 1.000, 35.90),
  ('00000000-0000-0000-0000-000000000001', 'Leite Condensado', 'unidade', 15.000, 5.000, 7.90);
