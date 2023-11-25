const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')

const createBlog = asyncHandler(async (req, res) => {
    const {title,description,category} = req.body
    if (!title || !description || !category) throw new Error('Missing inputs')
    
    //if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newBlog = await Blog.create(req.body)
    return res.status(200).json({
        success: newBlog ? true : false,
        createdBlog: newBlog ? newBlog : 'Cannot create new Blog :(('
    })
})


const getBlog = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const blog = await Blog.findByIdAndUpdate(pid,{$inc:{numberViews: 1 }},{new:true}).populate('likes', 'firstname lastname').populate('dislikes', 'firstname lastname')
    return res.status(200).json({
        success: blog ? true : false,
        BlogData: blog ? blog : 'Cannot get Blog'
    })
})
// Filtering, sorting & pagination
const getBlogs = asyncHandler(async (req, res) => {

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

    let queryCommand = Blog.find(formateQueries)

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
        const counts = await Blog.find(formateQueries).countDocuments()
        return res.status(200).json({
            success: response ? true : false,
            counts,
            BlogDatas: response ? response : 'Cannot get Blog',  
        })
    })
   
})
const updateBlog = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    //if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedBlog = await Blog.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updatedBlog ? true : false,
        updatedBlog: updatedBlog ? updatedBlog : 'Cannot update Blog'
    })
})
const deleteBlog = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedBlog = await Blog.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedBlog ? true : false,
        deletedBlog: deletedBlog ? deletedBlog : 'Cannot delete Blog'
    })
})


const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { pid } = req.params
    const blog = await Blog.findById(pid)
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if(alreadyDisliked){
        const response = await Blog.findByIdAndUpdate(pid,{$pull:{dislikes:_id}},{new:true})
        return res.status(200).json({
            success: response ? true : false,
            response: response ? response : 'Cannot dislike Blog'
        })
    }
    const isLiked = blog?.likes?.find(el => el.toString() === _id)
    if(isLiked){
        const response = await Blog.findByIdAndUpdate(pid,{$pull:{likes:_id}},{new:true})
        return res.status(200).json({
            success: response ? true : false,
            response: response ? response : 'Cannot pull like Blog'
        })
    }else{
        const response = await Blog.findByIdAndUpdate(pid,{$push:{likes:_id}},{new:true})
        return res.status(200).json({
            success: response ? true : false,
            response: response ? response : 'Cannot push like Blog'
        })
    }
})


const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { pid } = req.params
    const blog = await Blog.findById(pid)
    const alreadyLiked = blog?.likes?.find(el => el.toString() === _id)
    if(alreadyLiked){
        const response = await Blog.findByIdAndUpdate(pid,{$pull:{likes:_id}},{new:true})
        return res.status(200).json({
            success: response ? true : false,
            response: response ? response : 'Cannot like Blog'
        })
    }
    const isDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if(isDisliked){
        const response = await Blog.findByIdAndUpdate(pid,{$pull:{dislikes:_id}},{new:true})
        return res.status(200).json({
            success: response ? true : false,
            response: response ? response : 'Cannot pull dislikes Blog'
        })
    }else{
        const response = await Blog.findByIdAndUpdate(pid,{$push:{dislikes:_id}},{new:true})
        return res.status(200).json({
            success: response ? true : false,
            response: response ? response : 'Cannot push dislikes Blog'
        })
    }
})

const updateImage = asyncHandler(async (req, res) => {
    const {pid} = req.params
    if(!req.file) throw new Error('Missing inputs')
    const response = await Blog.findByIdAndUpdate(pid,{image:req.file.path},{new:true})
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : 'Something went wrong update image :(('
    })
})

module.exports = {
    createBlog,
    getBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
    likeBlog,
    dislikeBlog,
    updateImage
}