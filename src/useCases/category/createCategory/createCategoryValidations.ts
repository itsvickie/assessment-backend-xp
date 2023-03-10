import { body, ValidationChain } from 'express-validator'

import { ErrorMessages } from '../../../errors'
import MongoCategory from '../../../entities/category/categoryMongo'

export const createCategoryRules = (): ValidationChain[] => [
  body('name')
    .exists()
    .withMessage(ErrorMessages.E_REQUIRED_NAME_CATEGORY)
    .bail()
    .custom(async (value) => {
      const existsCategory = await MongoCategory.findOne(
        { name: value, is_deleted: false }
      )
      if (existsCategory) return Promise.reject()
      return Promise.resolve()
    })
    .withMessage(ErrorMessages.E_UNIQUE_CATEGORY)
]
