import { ErrorMessages } from '../../../errors'
import { IGetOneProductRequestDTO } from './getOneProductDTO'
import { IProductRepository } from '../../../repositories/IProductRepository'

export class GetOneProductUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}

  async execute(
    { productId }: IGetOneProductRequestDTO
  ): Promise<any> {
    try {
      return await this.productRepository.getOne(productId)
    } catch (error) {
      throw new Error(ErrorMessages.E_UNEXPECT_ERROR)
    }
  }
}
