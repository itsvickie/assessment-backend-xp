import { ErrorMessages } from '../../../errors'
import { ICategoryRepository } from '../../../repositories/ICategoryRepository'
import { IGetAllCategoryRequestDTO, IGetAllCategoryResponseDTO } from './getAllCategoryDTO'

export class GetAllCategoryUseCase {
  constructor(
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(
    query: IGetAllCategoryRequestDTO
  ): Promise<IGetAllCategoryResponseDTO> {
    try {
      const categories = await this.categoryRepository.getAll(query)
      const totalCount = await this.categoryRepository.countAll()
      
      const meta = {
        current_page: query.page,
        per_page: query.limit,
        total_itens: totalCount,
        total_page: Math.ceil(totalCount / query.limit),
      }

      return { meta, data: categories }
    } catch (error) {
      throw new Error(ErrorMessages.E_UNEXPECT_ERROR)
    }
  }
}
