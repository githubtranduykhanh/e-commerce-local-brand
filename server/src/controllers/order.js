
const Order = require('../models/order')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const createOrder = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const {coupon} = req.body
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
    const products = userCart?.cart?.map(el => ({
        product:el.product._id,
        count:el.quantity,
        color:el.color
    }))
    let total = userCart?.cart.reduce((sum,el) => el.product.price * el.quantity + sum ,0) 
    console.log(total)
    if(coupon) total = Math.round(total * (1 - coupon/100) / 1000)*1000
    console.log(total)
    const response = await Order.create({products,total,orderBy:_id})
    return res.status(200).json({
        success: response ? true : false,
        createdOrder: response ? response : 'Cannot create new Order :(('
    })
})

const updateStatus = asyncHandler(async (req, res) => {
    const { oid } = req.params
    const {status} = req.body
    if(!status) throw new Error('Missing inputs')
    const response = await Order.findByIdAndUpdate(oid,{status},{new:true})
    return res.status(200).json({
        success: response ? true : false,
        updateStatus: response ? response : 'Cannot update status order'
    })
})
const getOrder = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const response = await Order.findById(pid)
    return res.status(200).json({
        success: response ? true : false,
        getOrder: response ? response : 'Cannot get Order'
    })
})
// Filtering, sorting & pagination
const getOrders = asyncHandler(async (req, res) => {

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

    let queryCommand = Order.find(formateQueries)

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
        const counts = await Order.find(formateQueries).countDocuments()
        return res.status(200).json({
            success: response ? true : false,
            counts,
            OrderDatas: response ? response : 'Cannot get Order',  
        })
    })
   
})
const updateOrder = asyncHandler(async (req, res) => {
    const { pid } = req.params
    //if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedOrder = await Order.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updatedOrder ? true : false,
        updatedOrder: updatedOrder ? updatedOrder : 'Cannot update Order'
    })
})
const deleteOrder = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedOrder = await Order.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedOrder ? true : false,
        deletedOrder: deletedOrder ? deletedOrder : 'Cannot delete Order'
    })
})
module.exports = {
    createOrder,
    getOrder,
    getOrders,
    updateOrder,
    deleteOrder,
    updateStatus,
}