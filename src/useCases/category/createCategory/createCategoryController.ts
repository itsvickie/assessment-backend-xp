import { Request, Response } from 'express'
import { ErrorMessages } from '../../../errors'

import { CreateCategoryUseCase } from './createCategoryUseCase'

export class CreateCategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      await this.createCategoryUseCase.execute({ name: req.body.name })

      return res.status(201).send()
    } catch (error) {
      return res.status(400).json({
        message: error.message || ErrorMessages.E_UNEXPECT_ERROR
      })
    }
  }
}
