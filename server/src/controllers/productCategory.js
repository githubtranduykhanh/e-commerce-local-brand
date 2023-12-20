const ProductCategory = require('../models/productCategory')
const asyncHandler = require('express-async-handler')

const createCategory = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    //if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newCategory = await ProductCategory.create(req.body)
    return res.status(200).json({
        success: newCategory ? true : false,
        createdCategory: newCategory ? newCategory : 'Cannot create new category :(('
    })
})
const getCategory = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const category = await ProductCategory.findById(pid)
    return res.status(200).json({
        success: category ? true : false,
        categoryData: category ? category : 'Cannot get category'
    })
})
// Filtering, sorting & pagination
const getCategorys = asyncHandler(async (req, res) => {

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

    let queryCommand = ProductCategory.find(formateQueries)

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
    const limit = +req.query.limit || 0
    const skip = (page-1)*limit
    queryCommand.limit(limit).skip(skip)

    queryCommand.exec(async (err,response) =>{
        if(err) throw new Error(err.message)
        const counts = await ProductCategory.find(formateQueries).countDocuments()
        return res.status(200).json({
            success: response ? true : false,
            counts,
            categoryDatas: response ? response : 'Cannot get category',  
        })
    })
   
})
const updateCategory = asyncHandler(async (req, res) => {
    const { pid } = req.params
    //if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedCategory = await ProductCategory.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updatedCategory ? true : false,
        updatedCategory: updatedCategory ? updatedCategory : 'Cannot update category'
    })
})
const deleteCategory = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedCategory = await ProductCategory.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedCategory ? true : false,
        deletedCategory: deletedCategory ? deletedCategory : 'Cannot delete category'
    })
})
module.exports = {
    createCategory,
    getCategory,
    getCategorys,
    updateCategory,
    deleteCategory,
}