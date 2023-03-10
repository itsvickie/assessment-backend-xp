import { Types } from 'mongoose'

import { Category } from '../entities/category/category'
import { 
  IGetAllCategoryRequestDTO 
} from '../useCases/category/getAllCategory/getAllCategoryDTO'

export interface ICategoryRepository {
  save(category: Category): Promise<void>
  getAll(query: IGetAllCategoryRequestDTO): Promise<any>
  countAll(): Promise<number>
  delete(categoryId: Types.ObjectId): Promise<void>
}
