import { Request, Response } from 'express'
import { ErrorMessages } from '../../../errors'

import { CreateProductUseCase } from './createProductUseCase'

export class CreateProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { name, sku, price, description, quantity, categories } = req.body

      await this.createProductUseCase.execute(
        { name, sku, price, description, quantity, categories }
      )

      return res.status(201).send()
    } catch (error) {
      return res.status(400).json({
        message: error.message || ErrorMessages.E_UNEXPECT_ERROR
      })
    }
  }
}
