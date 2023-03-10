import { Types } from 'mongoose'

import { ICategoryRepository } from '../../ICategoryRepository'
import { Category } from '../../../entities/category/category'
import CategoryMongo from '../../../entities/category/categoryMongo'
import { 
  IGetAllCategoryRequestDTO 
} from '../../../useCases/category/getAllCategory/getAllCategoryDTO'

export class MongoCategoryRepository implements ICategoryRepository {
  private filterNoDeletedRegisters = false

  async save(category: Category): Promise<void> {
    await CategoryMongo.create(category)
  }

  async getAll(
    { limit, page, order_name }: IGetAllCategoryRequestDTO
  ): Promise<any> {
    const categories = await CategoryMongo
      .find({ is_deleted: this.filterNoDeletedRegisters }, ['name'])
      .sort({ name: order_name })
      .skip(limit * page)
      .limit(limit)

    return categories
  }

  async countAll(): Promise<number> {
    return await CategoryMongo.countDocuments(
      { is_deleted: this.filterNoDeletedRegisters }
    )
  }

  async delete(categoryId: Types.ObjectId): Promise<void> {
    await CategoryMongo.findByIdAndUpdate(
      categoryId, 
      { is_deleted: true }
    )
  }
}
