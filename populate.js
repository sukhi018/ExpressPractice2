require('dotenv').config()
const connectDb = require('./db/connect')
const ProductModel = require('./models/product')
const products = require('./products.json')
const addProducts = async()=>{

    try{
        await connectDb(process.env.mongoString)
        await ProductModel.deleteMany()
        await ProductModel.create(products)  
        console.log('Success')
        process.exit(0)


    }catch(err)
    {
        console.log(err)
        process.exit(1)

    }
}

addProducts()