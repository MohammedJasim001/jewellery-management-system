import express from 'express'
import cors from 'cors'
import globalErrorHandler from './middleware/globalErrorHandler.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api',authRoutes)
app.use('/api',productRoutes)


app.use(globalErrorHandler)

export default app