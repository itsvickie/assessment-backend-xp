import { DeleteCategoryUseCase } from './deleteCategoryUseCase'
import { DeleteCategoryController } from './deleteCategoryController'
import { 
  MongoCategoryRepository 
} from '../../../repositories/implementations/category/mongoCategoryRepository'

const mongoCategoryRepository = new MongoCategoryRepository()

const deleteCategoryUseCase = new DeleteCategoryUseCase(
  mongoCategoryRepository
)

const deleteCategoryController = new DeleteCategoryController(
  deleteCategoryUseCase
)

export { deleteCategoryController }
