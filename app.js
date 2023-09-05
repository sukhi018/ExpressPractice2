const connectDb = require('./db/connect')
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const errorHandler = require('./middleware/error-handler')
const notFound  = require('./middleware/not-found')
const Productrouter= require('./routes/products')
const port = process.env.PORT || 3000
app.use(express.json())
// set up routes


app.get('/',(req,res)=>{
    res.send('<h1>Store Api</h1><a href="/api/v1/products">Click to see the products</a>')
})

app.use('/api/v1/products',Productrouter)



app.use(notFound)
app.use(errorHandler)


const start = async()=>{
    try{
        // connect to db
        await connectDb(process.env.mongoString)

        app.listen(port,()=>{
            console.log(`Listening at port ${port}`)
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

start()
