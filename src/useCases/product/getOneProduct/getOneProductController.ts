import mongoose from 'mongoose'
import { Request, Response } from 'express'

import { ErrorMessages } from '../../../errors'
import { GetOneProductUseCase } from './getOneProductUseCase'

export class GetOneProductController {
  constructor(
    private getOneProductUseCase: GetOneProductUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const productId = new mongoose.Types.ObjectId(req.params.productId)
      const product = await this.getOneProductUseCase.execute({ productId })

      return res.status(200).json(product)
    } catch (error) {
      return res.status(400).json({
        message: error.message || ErrorMessages.E_UNEXPECT_ERROR
      })
    }
  }
}
