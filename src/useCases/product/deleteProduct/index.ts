import { DeleteProductUseCase } from '../deleteProduct/deleteProductUseCase'
import { DeleteProductController } from '../deleteProduct/deleteProductController'
import { 
  MongoProductRepository 
} from '../../../repositories/implementations/product/mongoProductRepository'

const mongoProductRepository = new MongoProductRepository()

const deleteProductUseCase = new DeleteProductUseCase(
  mongoProductRepository
)

const deleteProductController = new DeleteProductController(
  deleteProductUseCase
)

export { deleteProductController }
