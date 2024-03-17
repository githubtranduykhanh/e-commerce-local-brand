const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const makeSKU = require('uniqid')

const createProduct = asyncHandler(async (req, res) => {
    const {title, price, description, brand, category, color} = req.body
    const thumb = req?.files?.thumb[0]?.path
    const images =  req?.files?.images?.map(el => el?.path)
    if (!title || !price || !description || !brand || !category || !color) throw new Error('Missing inputs')
    req.body.slug = slugify(title)
    if(thumb) req.body.thumb = thumb
    if(images) req.body.images = images
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        mes: newProduct ? 'Create new product success' : 'Cannot create new product'
    })
})
const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid).populate({
        path:'ratings',
        populate:{
            path:'postedBy',
            select:'firstname lastname avatar'
        }
    })
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Cannot get product'
    })
})
// Filtering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {

    //BUILD QUERY
    // 1A) Filtering
    const queryObj = { ...req.query }
    
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(el => delete queryObj[el])

    //1B) Advanced filtering
    let queryString = JSON.stringify(queryObj)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)    
    const formateQueries = JSON.parse(queryString)
    let colorQueryObj = {}
    if(queryObj?.title) formateQueries.title = {$regex : queryObj.title, $options: 'i'}
    if(queryObj?.category) formateQueries.category = {$regex : queryObj.category, $options: 'i'}
    if(queryObj?.color){
        delete formateQueries.color
        const arrColor = queryObj?.color?.split('-') 
        const colorQuery = arrColor?.map(el => ({color:{$regex : el, $options: 'i'}}))
        colorQueryObj = {$or:colorQuery}
    } 
    if(queryObj?.search) {
        formateQueries.$or = [
            { title:  { $regex: '.*' + queryObj.search + '.*',$options: 'i' } },
            { brand:  { $regex: '.*' + queryObj.search + '.*',$options: 'i' } },
            { category: { $regex: '.*' + queryObj.search + '.*',$options: 'i' } },
            { color:  { $regex: '.*' + queryObj.search + '.*',$options: 'i' } },
        ]
        delete formateQueries.search
    }
    const newformateQueries = {...colorQueryObj,...formateQueries}
    
    
    let queryCommand = Product.find(newformateQueries)

    // 2) Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    } 


    //fields 
    if (req.query.fields) {
        const fieldsBy = req.query.fields.split(',').join(' ')
        queryCommand =  queryCommand.select(fieldsBy)
    }


    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCT
    const skip = (page-1)*limit
    queryCommand.limit(limit).skip(skip)

    queryCommand.exec(async (err,response) =>{
        if(err) throw new Error(err.message)
        const counts = await Product.find(newformateQueries).countDocuments()
        return res.status(200).json({
            success: response ? true : false,
            counts,
            productDatas: response ? response : 'Cannot get products',  
        })
    })
   
})
const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const files = req.files
    const {title, price, description, brand, category, color} = req.body
    if(files?.thumb) req.body.thumb = files?.thumb[0]?.path
    if(files?.images) req.body.images = files?.images?.map(el => el?.path)
    if (!title || !price || !description || !brand || !category || !color) throw new Error('Missing inputs')
    req.body.slug = slugify(req.body.title)
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updatedProduct ? true : false,
        mes: updatedProduct ? 'Update product success' : 'Cannot update product'
    })
})
const addVarriantProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const files = req.files
    const {title, price, color} = req.body
    if(files?.thumb) req.body.thumb = files?.thumb[0]?.path
    if(files?.images) req.body.images = files?.images?.map(el => el?.path)
    if (!title || !price || !color) throw new Error('Missing inputs')
    req.body.slug = slugify(req.body.title)
    req.body.sku = makeSKU().toUpperCase()
    const updatedProduct = await Product.findByIdAndUpdate(pid, {$push: {varriants:req.body}}, { new: true })
    return res.status(200).json({
        success: updatedProduct ? true : false,
        mes: updatedProduct ? 'Add new varriant product success' : 'Cannot update product'
    })
})
const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct ? 'Delete product successfully' : 'Cannot delete product'
    })
})
const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const {star,comment,pid,updateAt} = req.body
    if(!star || !pid) throw new Error('Missing inputs')

    const product = await Product.findById(pid)
    if(!product) throw new Error('Can not product id :((')
    const ratingsById =  product?.ratings?.find(el => {
        console.log('el.postedBy == _id :',el.postedBy == _id)
        return el.postedBy.toString() == _id
    })

    console.log('>>>ratingsById :',ratingsById)
    if(ratingsById){
        await Product.updateOne(
            {ratings:{$elemMatch:ratingsById}},
            {$set:{"ratings.$.star":star,"ratings.$.comment":comment,"ratings.$.updateAt":updateAt}},
            {new:true})       
    }else{
        await Product.findByIdAndUpdate(pid,{
            $push:{ratings:{star,comment,postedBy:_id,updateAt}}
        },{new:true})
    }

    const updatedProduct = await Product.findById(pid)
    const countRatings = updatedProduct?.ratings?.length
    const sumRatings = updatedProduct?.ratings?.reduce((sum,el)=>sum + +el.star,0)
    updatedProduct.totalRatings = Math.round(sumRatings*10/countRatings)/10
    await updatedProduct.save()

    return res.status(200).json({
        success: updatedProduct ? true : false,
        ratings: updatedProduct ? updatedProduct : 'Something went wrong :(('
    })
   
})

const updateImage = asyncHandler(async (req, res) => {
    const {pid} = req.params
    if(!req.files) throw new Error('Missing inputs')
    const response = await Product.findByIdAndUpdate(pid,{$push:{images: {$each:req.files.map(el => el.path)}}},{new:true})
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : 'Something went wrong update image :(('
    })
})



module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratings,
    updateImage,
    addVarriantProduct,
}