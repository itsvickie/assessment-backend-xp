import 'dotenv/config'
import express from 'express'

import './providers/database'
import routes from './routes'

const app = express()

app.use(express.json())
app.use('/api/v1', routes)

export { app }
