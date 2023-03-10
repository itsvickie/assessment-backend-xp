import mongoose from 'mongoose'
import { Request, Response } from 'express'

import { ErrorMessages } from '../../../errors'
import { UpdateProductUseCase } from './updateProductUseCase'

export class UpdateProductController {
  constructor (
    private updateProductUseCase: UpdateProductUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const productId = new mongoose.Types.ObjectId(req.params.productId)
      const { name, price, description, quantity, categories } = req.body

      const data = {}
      if (name !== undefined) Object.assign(data, {name})
      if (price !== undefined) Object.assign(data, {price})
      if (description !== undefined) Object.assign(data, {description})
      if (quantity !== undefined) Object.assign(data, {quantity})
      if (categories !== undefined) Object.assign(data, {categories})

      await this.updateProductUseCase.execute({ productId, data })

      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({
        message: error.message || ErrorMessages.E_UNEXPECT_ERROR
      })
    }
  }
}
