import { Types } from 'mongoose'

export interface IUpdateProductRequestDTO {
  productId: Types.ObjectId
  data: {
    name?: string
    price?: string
    description?: string
    quantity?: number
    categories?: Types.ObjectId[]
  }
}