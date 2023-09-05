const express = require('express')
const router = express.Router()
const {allProducts,allProductsStatic} = require('../controllers/products')


router.get('/',allProducts)
router.get('/static',allProductsStatic)
module.exports = router