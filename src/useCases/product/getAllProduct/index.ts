import { GetAllProductUseCase } from './getAllProductUseCase'
import { GetAllProductController } from './getAllProductController'
import { 
  MongoProductRepository 
} from '../../../repositories/implementations/product/mongoProductRepository'

const mongoProductRepository = new MongoProductRepository()

const getAllProductUseCase = new GetAllProductUseCase(
  mongoProductRepository
)

const getAllProductController = new GetAllProductController(
  getAllProductUseCase
)

export { getAllProductController }
