import { Types } from 'mongoose'

export class Category {
  public readonly _id: Types.ObjectId
  public name: string
  public is_deleted?: boolean

  constructor(props: Omit<Category, '_id'>, _id?: Types.ObjectId) {
    Object.assign(this, props)
  }
}
