import { param, ValidationChain } from 'express-validator'

import { ErrorMessages } from '../../../errors'
import MongoProduct from '../../../entities/product/productMongo'
import MongoCategory from '../../../entities/category/categoryMongo'

export const deleteCategoryRules = (): ValidationChain[] => [
  param('categoryId')
    .exists()
    .withMessage(ErrorMessages.E_REQUIRED_NAME_CATEGORY)
    .bail()
    .custom(async (value) => {
      const existsCategory = await MongoCategory.exists(
        { _id: value, is_deleted: false }
      )

      if (!existsCategory) return Promise.reject()
      return Promise.resolve()
    })
    .withMessage(ErrorMessages.E_NOT_FOUND_CATEGORY)
    .bail()
    .custom(async (value) => {
      const existsProductWithCategory = 
        await MongoProduct.exists(
          { categories: { '$in': value }, is_deleted: false }
        )

      if (existsProductWithCategory) return Promise.reject()
      return Promise.resolve()
    })
    .withMessage(ErrorMessages.E_CANNOT_DELETE_CATEGORY)
]
