import { Request, Response } from 'express'
import { SortOrder } from 'mongoose'
import { ErrorMessages } from '../../../errors'

import { GetAllCategoryUseCase } from './getAllCategoryUseCase'

export class GetAllCategoryController {
  constructor(
    private getAllCategoryUseCase: GetAllCategoryUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { page, limit, order_name } = req.query
      const params = {
        page: 0,
        limit: 10,
        order_name: ('asc' as SortOrder)
      }

      if (page) params.page = parseInt(page.toString())
      if (limit) params.limit = parseInt(limit.toString())
      if (order_name) params.order_name = (order_name as SortOrder)
      
      const categoriesResponse = 
        await this.getAllCategoryUseCase.execute(params)

      return res.status(200).json(categoriesResponse)
    } catch (error) {
      return res.status(400).json({
        message: error.message || ErrorMessages.E_UNEXPECT_ERROR
      })
    }
  }
}