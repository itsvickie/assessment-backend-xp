import { Types } from 'mongoose'

export interface ICreateProductRequestDTO {
  name: string
  sku: string
  price: string
  description: string
  quantity: number
  categories: Types.ObjectId[]
}
