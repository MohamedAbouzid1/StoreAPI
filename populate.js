// we use this to add data to the database using the list of products in the products.js file

require('dotenv').config()
const connectDB = require('./db/connect')

const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.insertMany(jsonProducts)
        console.log('Successfully added data to the database')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()