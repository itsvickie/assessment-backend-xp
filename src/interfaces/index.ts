export interface IPaginate {
  meta: {
    current_page: number
    total_page: number
    per_page: number
    total_itens: number
  }
}

export interface IQueryPaginate {
  limit?: number
  page?: number
}
