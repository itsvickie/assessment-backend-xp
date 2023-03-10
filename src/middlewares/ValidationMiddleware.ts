import { validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'

export const validateMiddleware = (
  req: Request, res: Response, next: NextFunction
) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() })
  }

  next()
}