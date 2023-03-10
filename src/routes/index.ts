import { Router } from 'express'

import category from './category'
import product from './product'

const routes = Router()

routes.use(category)
routes.use(product)

export default routes
