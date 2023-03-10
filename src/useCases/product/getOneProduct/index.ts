import { GetOneProductUseCase } from './getOneProductUseCase'
import { GetOneProductController } from './getOneProductController'
import { 
  MongoProductRepository 
} from '../../../repositories/implementations/product/mongoProductRepository'

const mongoProductRepository = new MongoProductRepository()

const getOneProductUseCase = new GetOneProductUseCase(
  mongoProductRepository
)

const getOneProductController = new GetOneProductController(
  getOneProductUseCase
)

export { getOneProductController }
