import { param, ValidationChain } from 'express-validator'

import { ErrorMessages } from '../../../errors'
import MongoProduct from '../../../entities/product/productMongo'

export const getOneProductRules = (): ValidationChain[] => [
  param('productId')
    .custom(async (value) => {
      const existsProduct = await MongoProduct.exists(
        { _id: value, is_deleted: false }
      )

      if (!existsProduct) return Promise.reject()
      return Promise.resolve()
    })
    .withMessage(ErrorMessages.E_NOT_FOUND_PRODUCT)
]
