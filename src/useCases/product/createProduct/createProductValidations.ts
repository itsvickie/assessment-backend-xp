import { body, ValidationChain } from 'express-validator'

import { ErrorMessages } from '../../../errors'
import MongoProduct from '../../../entities/product/productMongo'
import MongoCategory from '../../../entities/category/categoryMongo'

export const createProductRules = (): ValidationChain[] => [
  body('name')
    .exists()
    .withMessage(ErrorMessages.E_REQUIRED_NAME_PRODUCT)
    .bail()
    .isString()
    .withMessage(ErrorMessages.E_INVALID_NAME_PRODUCT),
  body('sku')
    .exists()
    .withMessage(ErrorMessages.E_REQUIRED_SKU_PRODUCT)
    .bail()
    .isString()
    .withMessage(ErrorMessages.E_INVALID_SKU_PRODUCT)
    .bail()
    .custom(async (value) => {
      const existsProduct = await MongoProduct.exists(
        { sku: value, is_deleted: false }
      )
      if (existsProduct) return Promise.reject()

      return Promise.resolve()
    })
    .withMessage(ErrorMessages.E_INVALID_QUANTITY_PRODUCT),
  body('price')
    .exists()
    .withMessage(ErrorMessages.E_REQUIRED_PRICE_PRODUCT)
    .bail()
    .isString()
    .withMessage(ErrorMessages.E_INVALID_PRICE_PRODUCT),
  body('quantity')
    .exists()
    .withMessage(ErrorMessages.E_REQUIRED_QUANTITY_PRODUCT)
    .bail()
    .isNumeric()
    .withMessage(ErrorMessages.E_INVALID_QUANTITY_PRODUCT),
  body('description')
    .optional()
    .bail()
    .isString()
    .withMessage(ErrorMessages.E_INVALID_DESCRIPTION_PRODUCT),
  body('categories')
    .exists()
    .withMessage(ErrorMessages.E_REQUIRED_CATEGORIES_PRODUCT)
    .bail()
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
