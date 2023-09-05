
const ProductModel = require('../models/product.js')
const rangeFilter = (str) => {
    let curr = []
    let oper = ''
    let final = []
    if (str==undefined)
    {
        return {}
    }
    for (let i = 0; i < str.length; i++) {
      if (['=', '>', '<'].includes(str[i])) {
        oper += str[i]
      } else {
        if (oper !== '') {
          final.push(curr.join(''))
          final.push('-' + oper + '-')
          oper = ''
          curr = [str[i]]
        } else {
          curr.push(str[i])
        }
      }
    }
  
    if (oper !== '') {
      final.push(curr.join(''))
      final.push('-' + oper + '-')
      oper = ''
    }
    final.push(curr.join(''))
  
    final = final.join('')
    final = final.split(',')
    const map = {'>':'$gt','<':'$lt','>=':'$gte','<=':'$lte','=':'$e'}
    const ans = {}
    for (let i in final) {
      const arr = final[i].split('-')
      if (['price','rating'].includes(arr[0]))
      {
        ans[arr[0]]={ [map[arr[1]]]:Number(arr[2])}
      }

    }
    return ans
  }
  
const allProducts = (req,res)=>{
    return res.status(200).json({msg:
    'All the products'})
}

const allProductsStatic = async(req,res)=>{
    const {featured,rating,name,price,company,sort,numericFilters} = req.query
    let query ={featured,rating,name,price,company}
    const sortObj = {}
    const numFil = {...rangeFilter(numericFilters)}
    
    if (sort!=undefined)
    {
        sortOrder = sort.split(',')
        for (let i in sortOrder)
        {

            if (sortOrder[i][0]!='-')
            {
                if (['featured','rating','name','price','company'].includes(sortOrder[i]))
                {
                console.log(sortOrder[i])

                    sortObj[sortOrder[i]]=1
                }

            }
            else{
                if (['featured','rating','name','price','company'].includes(sortOrder[i].slice(1,) ))
                {
            console.log(sortOrder[i])

                    sortObj[sortOrder[i].slice(1,)]=-1
                }
            }
        }
    }
    query = {...query,...numFil}
    for (let i in query)
    {
        if (query[i]===undefined)
        {
            delete query[i] 
        }else if (i=='name')
        {
            query[i]= {$regex:query[i],$options:'i'}
        }
    }

    const products = await ProductModel.find(query).sort(sortObj)
    return res.status(200).json(products)}

module.exports = {allProducts,allProductsStatic}