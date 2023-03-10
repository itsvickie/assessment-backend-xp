import { ErrorMessages } from '../../../errors'
import { Product } from '../../../entities/product/product'
import { ICreateProductRequestDTO } from './createProductDTO'
import { IProductRepository } from '../../../repositories/IProductRepository'

export class CreateProductUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}

  async execute(data: ICreateProductRequestDTO) {
    try {
      const product = new Product(data)
      await this.productRepository.save(product)
    } catch (e) {
      throw new Error(ErrorMessages.E_UNEXPECT_ERROR)
    }
  }
}
