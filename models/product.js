const mongoose = require('mongoose')
const schema = new mongoose.Schema({
name:{type:String,required:[true,'Name must be provided']},
price:{type:Number,required:[true,'Price must be provided']},
company:{type:String,enum:{
    values:['ikea','liddy','caressa','marcos'],
    message:'Value not supported'
}},
rating:{type:Number,default:4.5},
createdAt:{type:Date,default:Date.now()},
featured:{type:Boolean,default:false}
})


module.exports = mongoose.model('Product',schema)