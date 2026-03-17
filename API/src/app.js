import express from 'express'
import authRouter from './routes/auth.route.js'
import errorMiddleware from './middlewares/error.middleware.js'

const app = express()
app.use(express.json())

app.use('/api/auth', authRouter)

app.use(errorMiddleware)
export default app