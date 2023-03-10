
import { CreateProductUseCase } from './createProductUseCase'
import { CreateProductController } from './createProductController'
import { 
  MongoProductRepository 
} from '../../../repositories/implementations/product/mongoProductRepository'

const mongoProductRepository = new MongoProductRepository()

const createProductUseCase = new CreateProductUseCase(
  mongoProductRepository
)

const createProductController = new CreateProductController(
  createProductUseCase
)

export { createProductController }
