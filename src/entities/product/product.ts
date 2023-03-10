import { Types } from 'mongoose'

export class Product {
  public readonly _id: Types.ObjectId
  public categories: Types.ObjectId[]
  public is_deleted?: boolean
  public name: string
  public sku: string
  public price: string
  public description?: string
  public quantity: number

  constructor(props: Omit<Product, '_id'>, _id?: Types.ObjectId) {
    Object.assign(this, props)
  }
}
