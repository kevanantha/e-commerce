const fs = require('fs')

const User = require('../../models/User')
const products = fs.readFileSync('./test/seeds/products.json', 'utf8')
console.log(products)
