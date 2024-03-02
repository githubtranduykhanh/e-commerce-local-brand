const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const Product = require('../models/product')
const ProductCategory = require('../models/productCategory')
const data = require('../../../data/ecommerce2.json')
const dataCategory = require('../../../data/cate_brand')


const fnProduct = async (product) => {
    await Product.create({
        title:product?.name,
        slug:slugify(product?.name) + Math.round(Math.random() * 100)  + '',
        description:product?.description,
        brand:product?.brand,
        price:Math.round(Number(product?.price?.match(/\d/g).join(''))/100),
        category:product?.category[1],
        quantity:Math.round(Math.random()*1000),
        sold:Math.round(Math.random()*100),
        images:product?.images,
        color:product?.variants?.find(el => el?.label === "Color")?.variants[0] || 'BLACK',
        thumb:product?.thumb,
        variants:product?.variants,
        totalRatings: 0
    })
    //totalRatings:Math.round(Math.random() * 5)
}



const insertProduct = asyncHandler(async (req, res) => {
    const promises = []
    for(let product of data) promises.push(fnProduct(product))
    await Promise.all(promises)
    return res.json('ok')
})


const fnCategory = async (category) =>{
    await ProductCategory.create({
        title:category?.cate,
        brand:category?.brand,
        image:category?.image
    })
}

const insertCategory = asyncHandler(async (req, res) => {
    const promises = []
    for(let category of dataCategory) promises.push(fnCategory(category))
    await Promise.all(promises)
    return res.json('ok')
})

module.exports = {
    insertProduct,
    insertCategory
}