import { Router, Request, Response } from 'express'

import { validateMiddleware } from '../middlewares/ValidationMiddleware'

import { createProductController } from '../useCases/product/createProduct'
import { getAllProductController } from '../useCases/product/getAllProduct'
import { getOneProductController } from '../useCases/product/getOneProduct'
import { deleteProductController } from '../useCases/product/deleteProduct'
import { updateProductController } from '../useCases/product/updateProduct'

import { createProductRules } from '../useCases/product/createProduct/createProductValidations'
import { getOneProductRules } from '../useCases/product/getOneProduct/getOneProductValidations'
import { deleteProductRules } from '../useCases/product/deleteProduct/deleteProductValidations'
import { updateProductRules } from '../useCases/product/updateProduct/updateProductValidations'
import { getAllProductsRules } from '../useCases/product/getAllProduct/getAllProductValidations'

const routes = Router()

routes
  .route('/product')
  .post(
    createProductRules(),
    validateMiddleware,
    (req: Request, res: Response) => {
      return createProductController.handle(req, res)
    }
  )
  .get(
    getAllProductsRules(),
    validateMiddleware,
    (req: Request, res: Response) => {
      return getAllProductController.handle(req, res)
    }
  )

routes
  .route('/product/:productId')
  .get(
    getOneProductRules(),
    validateMiddleware,
    (req: Request, res: Response) => {
      return getOneProductController.handle(req, res)
    }
  )
  .delete(
    deleteProductRules(),
    validateMiddleware,
    (req: Request, res: Response) => {
      return deleteProductController.handle(req, res)
    }
  )
  .patch(
    updateProductRules(),
    validateMiddleware,
    (req: Request, res: Response) => {
      return updateProductController.handle(req, res)
    }
  )

export default routes
