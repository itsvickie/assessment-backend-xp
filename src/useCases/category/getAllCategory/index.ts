import { GetAllCategoryController } from './getAllCategoryController'
import { GetAllCategoryUseCase } from './getAllCategoryUseCase'
import { 
  MongoCategoryRepository 
} from '../../../repositories/implementations/category/mongoCategoryRepository'

const mongoCategoryRepository = new MongoCategoryRepository()

const getAllCategoryUseCase = new GetAllCategoryUseCase(
  mongoCategoryRepository
)

const getAllCategoryController = new GetAllCategoryController(
  getAllCategoryUseCase
)

export { getAllCategoryController }
