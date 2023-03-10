import { Category } from '../../../entities/category/category'
import { ErrorMessages } from '../../../errors'
import { ICategoryRepository } from '../../../repositories/ICategoryRepository'
import { ICreateCategoryRequestDTO } from './createCategoryDTO'

export class CreateCategoryUseCase {
  constructor(
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(data: ICreateCategoryRequestDTO) {
    try {
      const category = new Category(data)
      await this.categoryRepository.save(category)
    } catch (e) {
      throw new Error(ErrorMessages.E_UNEXPECT_ERROR)
    }
  }
}
