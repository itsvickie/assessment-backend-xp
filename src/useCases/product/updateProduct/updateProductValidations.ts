import { body, param, ValidationChain } from 'express-validator'

import { ErrorMessages } from '../../../errors'
import MongoProduct from '../../../entities/product/productMongo'
import MongoCategory from '../../../entities/category/categoryMongo'

export const updateProductRules = (): ValidationChain[] => [
  param('productId')
    .custom(async (value) => {
      const existsProduct = await MongoProduct.exists(
        { _id: value, is_deleted: false }
      )

      if (!existsProduct) return Promise.reject()
      return Promise.resolve()
    })
    .withMessage(ErrorMessages.E_NOT_FOUND_PRODUCT),
  body('name')
    .isString()
    .withMessage(ErrorMessages.E_INVALID_NAME_PRODUCT),
  body('price')
    .isString()
    .withMessage(ErrorMessages.E_INVALID_PRICE_PRODUCT),
  body('quantity')
    .isNumeric()
    .withMessage(ErrorMessages.E_INVALID_QUANTITY_PRODUCT),
  body('categories')
    .isArray()
    .withMessage(ErrorMessages.E_INVALID_CATEGORIES_PRODUCT)
    .bail()
    .custom(async (values) => {
      for (const value of values) {
        const existsCategory = await MongoCategory.exists(
          { _id: value, is_deleted: false }
        )
        if (!existsCategory) await Promise.reject()
      }
      return await Promise.resolve()
    })
    .withMessage(ErrorMessages.E_NOT_FOUND_ONE_OR_MORE_CATEGORIES)
]
