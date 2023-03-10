import mongoose from 'mongoose'
import { Request, Response } from 'express'

import { ErrorMessages } from '../../../errors'
import { DeleteProductUseCase } from './deleteProductUseCase'

export class DeleteProductController {
  constructor(
    private deleteProductUseCase: DeleteProductUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const productId = new mongoose.Types.ObjectId(req.params.productId)
      await this.deleteProductUseCase.execute({ productId })

      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({
        message: error.message || ErrorMessages.E_UNEXPECT_ERROR
      })
    }
  }
}
