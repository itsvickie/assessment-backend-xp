import { ErrorMessages } from '../../../errors'
import { IProductRepository } from '../../../repositories/IProductRepository'
import { IGetAllProductRequestDTO, IGetAllProductResponseDTO } from './getAllProductDTO'

export class GetAllProductUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}

  async execute(
    query: IGetAllProductRequestDTO
  ): Promise<IGetAllProductResponseDTO> {
    try {
      const products = await this.productRepository.getAll(query)
      const totalCount = await this.productRepository.countAll()

      const meta = {
        current_page: query.page,
        per_page: query.limit,
        total_itens: totalCount,
        total_page: Math.ceil(totalCount / query.limit),
      }

      return { meta, data: products }
    } catch (error) {
      throw new Error(ErrorMessages.E_UNEXPECT_ERROR)
    }
  }
}
