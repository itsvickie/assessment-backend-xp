import { UpdateProductUseCase } from './updateProductUseCase'
import { UpdateProductController } from './updateProductController'
import { 
  MongoProductRepository 
} from '../../../repositories/implementations/product/mongoProductRepository'

const mongoProductRepository = new MongoProductRepository()

const updateProductUseCase = new UpdateProductUseCase(
  mongoProductRepository
)

const updateProductController = new UpdateProductController(
  updateProductUseCase
)

export { updateProductController }
