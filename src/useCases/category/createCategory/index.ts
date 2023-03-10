import { CreateCategoryUseCase } from './createCategoryUseCase'
import { CreateCategoryController } from './createCategoryController'
import { 
  MongoCategoryRepository 
} from '../../../repositories/implementations/category/mongoCategoryRepository'

const mongoCategoryRepository = new MongoCategoryRepository()

const createCategoryUseCase = new CreateCategoryUseCase(
  mongoCategoryRepository
)

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
)

export { createCategoryController }
