const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

const createCoupon = asyncHandler(async (req, res) => {
    const {name,discount,expiry} = req.body
    if (!name || !discount || !expiry) throw new Error('Missing inputs')
    //if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newCoupon = await Coupon.create({
        ...req.body,
        expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({
        success: newCoupon ? true : false,
        createdCoupon: newCoupon ? newCoupon : 'Cannot create new Coupon :(('
    })
})
const getCoupon = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const Coupon = await Coupon.findById(pid)
    return res.status(200).json({
        success: Coupon ? true : false,
        CouponData: Coupon ? Coupon : 'Cannot get Coupon'
    })
})
// Filtering, sorting & pagination
const getCoupons = asyncHandler(async (req, res) => {

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

    let queryCommand = Coupon.find(formateQueries)

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
        const counts = await Coupon.find(formateQueries).countDocuments()
        return res.status(200).json({
            success: response ? true : false,
            counts,
            CouponDatas: response ? response : 'Cannot get Coupon',  
        })
    })
   
})
const updateCoupon = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (req.body && req.body.expiry) req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000
    const updatedCoupon = await Coupon.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updatedCoupon ? true : false,
        updatedCoupon: updatedCoupon ? updatedCoupon : 'Cannot update Coupon'
    })
})
const deleteCoupon = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedCoupon = await Coupon.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedCoupon ? true : false,
        deletedCoupon: deletedCoupon ? deletedCoupon : 'Cannot delete Coupon'
    })
})
module.exports = {
    createCoupon,
    getCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon,
}