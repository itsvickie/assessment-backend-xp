import { SortOrder } from 'mongoose'

import { Category } from '../../../entities/category/category'
import { IPaginate, IQueryPaginate } from '../../../interfaces'

export interface IGetAllCategoryResponseDTO extends IPaginate {
  data: Category[]
}

export interface IGetAllCategoryRequestDTO extends IQueryPaginate {
  order_name?: SortOrder
}
