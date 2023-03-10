import { Router, Request, Response } from 'express'

import { createCategoryController } from '../useCases/category/createCategory'
import { getAllCategoryController } from '../useCases/category/getAllCategory'
import { deleteCategoryController } from '../useCases/category/deleteCategory'
import {
  createCategoryRules 
} from '../useCases/category/createCategory/createCategoryValidations'
import { validateMiddleware } from '../middlewares/ValidationMiddleware'
import { getAllCategoriesRules } from '../useCases/category/getAllCategory/getAllCategoryValidations'
import { deleteCategoryRules } from '../useCases/category/deleteCategory/deleteCategoryValidations'

const routes = Router()

routes
  .route('/category')
  .post(
    createCategoryRules(),
    validateMiddleware,
    (req: Request, res: Response) => {
      return createCategoryController.handle(req, res)
    }
  )
  .get(
    getAllCategoriesRules(),
    validateMiddleware,
    (req: Request, res: Response) => {
      return getAllCategoryController.handle(req, res)
    }
  )

routes
  .route('/category/:categoryId')
  .delete(
    deleteCategoryRules(),
    validateMiddleware,
    (req: Request, res: Response) => {
      return deleteCategoryController.handle(req, res)
    }
  )

export default routes
