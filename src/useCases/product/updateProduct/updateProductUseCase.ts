import { ErrorMessages } from '../../../errors'

import { IProductRepository } from '../../../repositories/IProductRepository'
import { IUpdateProductRequestDTO } from './updateProductDTO'

export class UpdateProductUseCase {
  constructor (
    private productRepository: IProductRepository
  ) {}

  async execute({ productId, data }: IUpdateProductRequestDTO) {
    try {
      await this.productRepository.update({ productId, data })
    } catch (error) {
      throw new Error(ErrorMessages.E_UNEXPECT_ERROR)
    }
  }
}
