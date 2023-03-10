import mongoose from 'mongoose'
import { Request, Response } from 'express'

import { ErrorMessages } from '../../../errors'
import { DeleteCategoryUseCase } from './deleteCategoryUseCase'

export class DeleteCategoryController {
  constructor(
    private deleteCategoryUseCase: DeleteCategoryUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const categoryId = new mongoose.Types.ObjectId(req.params.categoryId)
      await this.deleteCategoryUseCase.execute({ categoryId })

      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({
        message: error.message || ErrorMessages.E_UNEXPECT_ERROR
      })
    }
  }
}
