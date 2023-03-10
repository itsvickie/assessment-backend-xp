import { Types } from 'mongoose'

import { Product } from '../../../entities/product/product'
import { IProductRepository } from '../../IProductRepository'
import ProductMongo from '../../../entities/product/productMongo'
import { 
  IGetAllProductRequestDTO 
} from '../../../useCases/product/getAllProduct/getAllProductDTO'
import { 
  IUpdateProductRequestDTO 
} from '../../../useCases/product/updateProduct/updateProductDTO'

export class MongoProductRepository implements IProductRepository {
  private filterNoDeletedRegisters = false

  async save(product: Product): Promise<void> {
    await ProductMongo.create(product)
  }

  async getAll(
    { limit, page, order_name, order_price, name, sku }: IGetAllProductRequestDTO
  ): Promise<any> {
    const whereQuery = {
      is_deleted: this.filterNoDeletedRegisters
    }
    if (name) Object.assign(whereQuery, { name: { $regex: name, $options: 'i' } })
    if (sku) Object.assign(whereQuery, { sku: { $regex: sku, $options: 'i' } })

    const products = await ProductMongo
      .find(whereQuery, ['name', 'sku', 'price', 'quantity', 'createdAt'])
      .sort({ name: order_name, price: order_price })
      .skip(limit * page)
      .limit(limit)

    return products
  }

  async countAll(): Promise<number> {
    return await ProductMongo.countDocuments(
      { is_deleted: this.filterNoDeletedRegisters }
    )
  }

  async getOne(productId: Types.ObjectId): Promise<any> {
    return await ProductMongo
      .findById(productId)
      .select(['-updatedAt', '-is_deleted'])
      .populate(
        { path: 'categories', select: 'name' }
      )
  }

  async delete(productId: Types.ObjectId): Promise<void> {
    await ProductMongo.findByIdAndUpdate(
      productId,
      { is_deleted: true }
    )
  }

  async update( 
    { productId, data }: IUpdateProductRequestDTO
  ): Promise<void> {
    await ProductMongo.findByIdAndUpdate(
      productId,
      data
    )
  }
}
