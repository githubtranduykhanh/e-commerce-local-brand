const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler')

const createBrand = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    //if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newBrand = await Brand.create(req.body)
    return res.status(200).json({
        success: newBrand ? true : false,
        createdBrand: newBrand ? newBrand : 'Cannot create new Brand :(('
    })
})
const getBrand = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const Brand = await Brand.findById(pid)
    return res.status(200).json({
        success: Brand ? true : false,
        BrandData: Brand ? Brand : 'Cannot get Brand'
    })
})
// Filtering, sorting & pagination
const getBrands = asyncHandler(async (req, res) => {

    //BUILD QUERY
    // 1A) Filtering
    const queryObj = { ...req.query }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(el => delete queryObj[el])

    //1B) Advanced filtering
    let queryString = JSON.stringify(queryObj)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)    
    const formateQueries = JSON.parse(queryString)

    if(queryObj?.title) formateQueries.title = {$regex : queryObj.title, $options: 'i'}

    let queryCommand = Brand.find(formateQueries)

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
        const counts = await Brand.find(formateQueries).countDocuments()
        return res.status(200).json({
            success: response ? true : false,
            counts,
            BrandDatas: response ? response : 'Cannot get Brand',  
        })
    })
   
})
const updateBrand = asyncHandler(async (req, res) => {
    const { pid } = req.params
    //if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedBrand = await Brand.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updatedBrand ? true : false,
        updatedBrand: updatedBrand ? updatedBrand : 'Cannot update Brand'
    })
})
const deleteBrand = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedBrand = await Brand.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedBrand ? true : false,
        deletedBrand: deletedBrand ? deletedBrand : 'Cannot delete Brand'
    })
})
module.exports = {
    createBrand,
    getBrand,
    getBrands,
    updateBrand,
    deleteBrand,
}