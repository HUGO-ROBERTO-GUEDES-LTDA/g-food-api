// =============================================
// Tipos base do banco de dados
// =============================================

export interface Restaurante {
  id: string
  nome: string
  cnpj: string | null
  endereco: string | null
  telefone: string | null
  logo_url: string | null
  ativo: boolean
  created_at: string
  updated_at: string
}

export interface Usuario {
  id: string
  restaurante_id: string
  nome: string
  cpf: string
  role: 'admin' | 'gerente' | 'garcom' | 'cozinheiro'
  senha_hash: string
  ativo: boolean
  created_at: string
  updated_at: string
}

export interface Mesa {
  id: string
  restaurante_id: string
  numero: number
  capacidade: number
  status: 'disponivel' | 'ocupada' | 'reservada' | 'suja'
  ativo: boolean
  created_at: string
  updated_at: string
}

export interface Caixa {
  id: string
  restaurante_id: string
  aberto_por: string
  fechado_por: string | null
  valor_abertura: number
  valor_fechamento: number | null
  valor_total_vendas: number
  status: 'aberto' | 'fechado'
  observacoes: string | null
  aberto_em: string
  fechado_em: string | null
}

export interface MovimentoCaixa {
  id: string
  caixa_id: string
  tipo: 'entrada' | 'saida' | 'sangria' | 'reforco'
  valor: number
  descricao: string | null
  usuario_id: string | null
  created_at: string
}

export interface Categoria {
  id: string
  restaurante_id: string
  nome: string
  descricao: string | null
  ordem: number
  ativo: boolean
  created_at: string
  updated_at: string
}

export interface ItemCardapio {
  id: string
  restaurante_id: string
  categoria_id: string
  nome: string
  descricao: string | null
  preco: number
  imagem_url: string | null
  disponivel: boolean
  tempo_preparo_min: number | null
  created_at: string
  updated_at: string
}

export interface Pedido {
  id: string
  restaurante_id: string
  mesa_id: string | null
  garcom_id: string | null
  caixa_id: string | null
  numero: number
  tipo: 'mesa' | 'balcao' | 'online'
  status:
    | 'rascunho'
    | 'confirmado'
    | 'preparando'
    | 'pronto'
    | 'servido'
    | 'saiu_entrega'
    | 'entregue'
    | 'fechado'
    | 'cancelado'
  observacoes: string | null
  cliente_cpf: string | null
  cliente_telefone: string | null
  cliente_nome: string | null
  codigo_acompanhamento: string | null
  subtotal: number
  desconto: number
  total: number
  created_at: string
  updated_at: string
}

export interface ItemPedido {
  id: string
  pedido_id: string
  item_cardapio_id: string
  quantidade: number
  preco_unitario: number
  observacoes: string | null
  status: 'pendente' | 'preparando' | 'pronto' | 'entregue' | 'cancelado'
  created_at: string
  updated_at: string
}

export interface Pagamento {
  id: string
  pedido_id: string
  caixa_id: string | null
  metodo: 'dinheiro' | 'cartao_credito' | 'cartao_debito' | 'pix'
  valor: number
  valor_recebido: number | null
  troco: number
  status: 'pendente' | 'confirmado' | 'cancelado'
  referencia: string | null
  created_at: string
}

export interface Insumo {
  id: string
  restaurante_id: string
  nome: string
  unidade: string
  estoque_atual: number
  estoque_minimo: number
  custo_unitario: number
  ativo: boolean
  created_at: string
  updated_at: string
}

export interface Receita {
  id: string
  item_cardapio_id: string
  insumo_id: string
  quantidade: number
}

export interface MovimentoEstoque {
  id: string
  insumo_id: string
  tipo: 'entrada' | 'saida' | 'ajuste' | 'consumo'
  quantidade: number
  motivo: string | null
  pedido_id: string | null
  usuario_id: string | null
  created_at: string
}

// =============================================
// Tipos com relacionamentos (joins)
// =============================================

export interface ItemCardapioComCategoria extends ItemCardapio {
  categoria: Categoria
}

export interface PedidoCompleto extends Pedido {
  mesa?: Mesa | null
  garcom?: Usuario | null
  itens: ItemPedidoCompleto[]
  pagamentos: Pagamento[]
}

export interface ItemPedidoCompleto extends ItemPedido {
  item_cardapio: ItemCardapio
}

export interface CaixaCompleto extends Caixa {
  aberto_por_usuario: Usuario
  fechado_por_usuario?: Usuario | null
  movimentos: MovimentoCaixa[]
}

export interface InsumoComEstoque extends Insumo {
  estoque_baixo: boolean
}
