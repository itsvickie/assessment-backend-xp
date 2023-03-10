import { SortOrder } from 'mongoose'
import { Request, Response } from 'express'

import { ErrorMessages } from '../../../errors'
import { GetAllProductUseCase } from './getAllProductUseCase'

export class GetAllProductController {
  constructor(
    private getAllProductUseCase: GetAllProductUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { page, limit, sku, name, order_name, order_price } = req.query
      const params = {
        page: 0,
        limit: 10,
        order_name: ('asc' as SortOrder),
        order_price: ('asc' as SortOrder)
      }

      if (page) params.page = parseInt(page.toString())
      if (limit) params.limit = parseInt(limit.toString())
      if (order_name) params.order_name = (order_name as SortOrder)
      if (order_price) params.order_price = (order_price as SortOrder)
      if (sku) Object.assign(params, { sku })
      if (name) Object.assign(params, { name })
      
      const productsResponse = 
        await this.getAllProductUseCase.execute(params)

      return res.status(200).json(productsResponse)
    } catch (error) {
      return res.status(400).json({
        message: error.message || ErrorMessages.E_UNEXPECT_ERROR
      })
    }
  }
}