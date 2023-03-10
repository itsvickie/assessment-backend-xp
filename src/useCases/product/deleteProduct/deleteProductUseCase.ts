import { IDeleteProductRequestDTO } from './deleteProductDTO'
import { IProductRepository } from '../../../repositories/IProductRepository'
import { ErrorMessages } from '../../../errors'

export class DeleteProductUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}

  async execute({ productId }: IDeleteProductRequestDTO) {
    try {
      await this.productRepository.delete(productId)
    } catch (error) {
      throw new Error(ErrorMessages.E_UNEXPECT_ERROR)
    }
  }
}