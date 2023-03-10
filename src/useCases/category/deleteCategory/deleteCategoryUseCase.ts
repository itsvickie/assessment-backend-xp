import { ErrorMessages } from '../../../errors'
import { IDeleteCategoryRequestDTO } from './deleteCategoryDTO'
import { ICategoryRepository } from '../../../repositories/ICategoryRepository'

export class DeleteCategoryUseCase {
  constructor(
    private categoryRepository: ICategoryRepository
  ) {}

  async execute({ categoryId }: IDeleteCategoryRequestDTO) {
    try {
      await this.categoryRepository.delete(categoryId)
    } catch (error) {
      throw new Error(ErrorMessages.E_UNEXPECT_ERROR)
    }
  }
}