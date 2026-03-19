export const MESA_STATUS = {
  DISPONIVEL: 'disponivel',
  OCUPADA: 'ocupada',
  RESERVADA: 'reservada',
  SUJA: 'suja',
} as const

export type MesaStatus = (typeof MESA_STATUS)[keyof typeof MESA_STATUS]

export const MESA_STATUS_LABELS: Record<MesaStatus, string> = {
  disponivel: 'Disponível',
  ocupada: 'Ocupada',
  reservada: 'Reservada',
  suja: 'Suja',
}

export const MESA_STATUS_COLORS: Record<MesaStatus, string> = {
  disponivel: 'bg-green-500',
  ocupada: 'bg-blue-500',
  reservada: 'bg-yellow-500',
  suja: 'bg-gray-400',
}

export const PEDIDO_STATUS = {
  RASCUNHO: 'rascunho',
  CONFIRMADO: 'confirmado',
  PREPARANDO: 'preparando',
  PRONTO: 'pronto',
  SERVIDO: 'servido',
  SAIU_ENTREGA: 'saiu_entrega',
  ENTREGUE: 'entregue',
  FECHADO: 'fechado',
  CANCELADO: 'cancelado',
} as const

export type PedidoStatus = (typeof PEDIDO_STATUS)[keyof typeof PEDIDO_STATUS]

export const PEDIDO_STATUS_LABELS: Record<PedidoStatus, string> = {
  rascunho: 'Rascunho',
  confirmado: 'Confirmado',
  preparando: 'Preparando',
  pronto: 'Pronto',
  servido: 'Servido',
  saiu_entrega: 'Saiu para Entrega',
  entregue: 'Entregue',
  fechado: 'Fechado',
  cancelado: 'Cancelado',
}

export const PEDIDO_STATUS_COLORS: Record<PedidoStatus, string> = {
  rascunho: 'bg-gray-400',
  confirmado: 'bg-blue-500',
  preparando: 'bg-orange-500',
  pronto: 'bg-green-500',
  servido: 'bg-emerald-600',
  saiu_entrega: 'bg-purple-500',
  entregue: 'bg-teal-500',
  fechado: 'bg-gray-600',
  cancelado: 'bg-red-500',
}

export const PEDIDO_TIPO = {
  MESA: 'mesa',
  BALCAO: 'balcao',
  ONLINE: 'online',
} as const

export type PedidoTipo = (typeof PEDIDO_TIPO)[keyof typeof PEDIDO_TIPO]

export const ITEM_PEDIDO_STATUS = {
  PENDENTE: 'pendente',
  PREPARANDO: 'preparando',
  PRONTO: 'pronto',
  ENTREGUE: 'entregue',
  CANCELADO: 'cancelado',
} as const

export type ItemPedidoStatus = (typeof ITEM_PEDIDO_STATUS)[keyof typeof ITEM_PEDIDO_STATUS]

export const CAIXA_STATUS = {
  ABERTO: 'aberto',
  FECHADO: 'fechado',
} as const

export type CaixaStatus = (typeof CAIXA_STATUS)[keyof typeof CAIXA_STATUS]

export const MOVIMENTO_CAIXA_TIPO = {
  ENTRADA: 'entrada',
  SAIDA: 'saida',
  SANGRIA: 'sangria',
  REFORCO: 'reforco',
} as const

export type MovimentoCaixaTipo = (typeof MOVIMENTO_CAIXA_TIPO)[keyof typeof MOVIMENTO_CAIXA_TIPO]

export const METODO_PAGAMENTO = {
  DINHEIRO: 'dinheiro',
  CARTAO_CREDITO: 'cartao_credito',
  CARTAO_DEBITO: 'cartao_debito',
  PIX: 'pix',
} as const

export type MetodoPagamento = (typeof METODO_PAGAMENTO)[keyof typeof METODO_PAGAMENTO]

export const METODO_PAGAMENTO_LABELS: Record<MetodoPagamento, string> = {
  dinheiro: 'Dinheiro',
  cartao_credito: 'Cartão de Crédito',
  cartao_debito: 'Cartão de Débito',
  pix: 'PIX',
}

export const MOVIMENTO_ESTOQUE_TIPO = {
  ENTRADA: 'entrada',
  SAIDA: 'saida',
  AJUSTE: 'ajuste',
  CONSUMO: 'consumo',
} as const

export type MovimentoEstoqueTipo = (typeof MOVIMENTO_ESTOQUE_TIPO)[keyof typeof MOVIMENTO_ESTOQUE_TIPO]
