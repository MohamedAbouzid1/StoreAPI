require('dotenv').config()

// async errors
require('express-async-errors')

const express = require('express')
const app = express()
const productsRouter = require('./routes/products')

// error handler

notFoundMiddleware = require('./middleware/not-found')
errorHandlerMiddleware = require('./middleware/error-handler')
connectDB = require('./db/connect')

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>')
})

// products route
app.use('/api/v1/products', productsRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Connected to MongoDB')
        app.listen(port, () => console.log(`Server is running on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()