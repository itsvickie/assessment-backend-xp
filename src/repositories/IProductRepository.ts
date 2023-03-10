import { Types } from 'mongoose'

import { Product } from '../entities/product/product'
import { IGetAllProductRequestDTO } from '../useCases/product/getAllProduct/getAllProductDTO'
import { IUpdateProductRequestDTO } from '../useCases/product/updateProduct/updateProductDTO'

export interface IProductRepository {
  save(product: Product): Promise<void>
  getAll(query: IGetAllProductRequestDTO): Promise<any>
  countAll(): Promise<number>
  getOne(productId: Types.ObjectId): Promise<any>
  delete(productId: Types.ObjectId): Promise<void>
  update({ productId, data }: IUpdateProductRequestDTO): Promise<void>
}
