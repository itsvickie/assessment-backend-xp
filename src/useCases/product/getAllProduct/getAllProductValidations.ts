import { query, ValidationChain } from 'express-validator'

import { ErrorMessages } from '../../../errors'

export const getAllProductsRules = (): ValidationChain[] => [
  query('page')
    .optional()
    .bail()
    .isNumeric()
    .withMessage(ErrorMessages.E_PAGE_PARAM_IS_NUMERIC)
    .bail()
    .custom((value) => {
      if (value < 0) return Promise.reject()
      return Promise.resolve()
    })
    .withMessage(ErrorMessages.E_PAGE_PARAM_INVALID),
  query('limit')
    .optional()
    .bail()
    .isNumeric()
    .withMessage(ErrorMessages.E_LIMIT_PARAM_IS_NUMERIC)
    .bail()
    .custom((value) => {
      if (value < 0) return Promise.reject()
      return Promise.resolve()
    })
    .withMessage(ErrorMessages.E_LIMIT_PARAM_INVALID),
  query('order_name')
    .optional()
    .bail()
    .custom((value) => {
      const sortOrder = [ -1,  1, 'asc', 'ascending', 'desc', 'descending' ]
      const valueInSortOrder = sortOrder.includes(value)

      if (!valueInSortOrder) return Promise.reject()
      return Promise.resolve()
    })
    .withMessage(ErrorMessages.E_ORDER_NAME_PARAM_INVALID),
  query('order_price')
    .optional()
    .bail()
    .custom((value) => {
      const sortOrder = [ -1,  1, 'asc', 'ascending', 'desc', 'descending' ]
      const valueInSortOrder = sortOrder.includes(value)

      if (!valueInSortOrder) return Promise.reject()
      return Promise.resolve()
    })
    .withMessage(ErrorMessages.E_ORDER_PRICE_PARAM_INVALID)
]
