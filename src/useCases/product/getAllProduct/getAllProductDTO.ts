import { SortOrder } from 'mongoose'

import { Product } from '../../../entities/product/product'
import { IPaginate, IQueryPaginate } from '../../../interfaces'

export interface IGetAllProductResponseDTO extends IPaginate {
  data: Product[]
}

export interface IGetAllProductRequestDTO extends IQueryPaginate {
  order_name?: SortOrder
  order_price?: SortOrder
  sku?: string
  name?: string
}
