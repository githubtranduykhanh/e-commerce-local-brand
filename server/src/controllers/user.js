const User = require('../models/user')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const crypto = require('crypto')
const uniqid = require('uniqid')
require('dotenv').config()


const {generateAccessToken,generateRefreshToken} = require('../middlewares/jwt')
const sendMail = require('../ultils/sendMail')


const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname } = req.body
    if (!email || !password || !lastname || !firstname)
        return res.status(400).json({
            sucess: false,
            mes: 'Missing inputs'
        })
    

    const user = await User.findOne({ email })
  
    if (user) throw new Error('User has existed')
    else {
      
        const newUser = await User.create(req.body)
        
        return res.status(200).json({
            sucess: newUser ? true : false,
            mes: newUser ? 'Register is successfully. Please go login :))' : 'Something went wrong'
        })
    }
})

const registerEmail = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body
    if (!email || !password || !lastname || !firstname || !mobile)
        return res.status(400).json({
            sucess: false,
            mes: 'Missing inputs'
        })
    

    const user = await User.findOne({ $or:[{email},{mobile}]})
    
    if (user) throw new Error('User has existed')
    else {

        const token = uniqid()
        // Lưu refresh token vào cookie
        res.cookie('dataRegister', {...req.body,token}, { httpOnly: true, maxAge: 15* 60 * 1000 })

        const html = `Xin vui lòng click vào link dưới đây để hoàng tất quá trình đăng ký của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/finalregister/${token}>Click here</a>`

        const rs = await sendMail(email,html,'Hoàng tất đăng ký DIGITAL WORLD')

        return res.status(200).json({
            sucess: true,
            data:rs,
            mes: 'Register Email is successfully.' 
        })
    }
})


const finalRegister = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    const { token } = req.params
    if(!cookies || !cookies.dataRegister || cookies?.dataRegister?.token !== token ){
        res.clearCookie('dataRegister')
        res.redirect(`${process.env.URL_CLIENT}/final-register/failedcookies`)
    } 
    
    const {token:tokenCk,...data} = cookies.dataRegister
    
    const newUser = await User.create(data)
    res.clearCookie('dataRegister')
    if(newUser) res.redirect(`${process.env.URL_CLIENT}/final-register/success`)
    else res.redirect(`${process.env.URL_CLIENT}/final-register/failed`)
    
})
// Refresh token => Cấp mới access token
// Access token => Xác thực người dùng, quân quyên người dùng
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({
            sucess: false,
            mes: 'Missing inputs'
        })
    // plain object
    const response = await User.findOne({ email })
    if (response && await response.isCorrectPassword(password)) {
        // Tách password và role ra khỏi response
        const { password, role, refreshToken, ...userData } = response.toObject()
        // Tạo access token
        const accessToken = generateAccessToken(response._id, role)
        // Tạo refresh token
        const newRefreshToken = generateRefreshToken(response._id)
        // Lưu refresh token vào database
        await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true })
        // Lưu refresh token vào cookie
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            sucess: true,
            accessToken,
            userData:{...userData,role}
        })
    } else {
        throw new Error('Invalid credentials!')
    }
})

const current = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const user = await User.findById(_id).select('-refreshToken -password')
    return res.status(user ? 200 : 400).json({
        sucess: user ? true : false,
        rs:user ? user : 'User not found'
    })
})


const refreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    console.log('>>>>>refreshToken: ',cookies?.refreshToken)
    if(!cookies || !cookies.refreshToken) throw new Error('No refresh token in cookie !')
    const refreshTokenData = jwt.verify(cookies.refreshToken, process.env.JWT_SECRET)
    const user = await User.findOne({_id:refreshTokenData._id,refreshToken:cookies.refreshToken})
    return res.status(user ? 200 : 400).json({
        sucess: user ? true : false,
        newAccessToken:user ? generateAccessToken(user._id,user.role) : 'Refresh Token not matched'
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    if(!cookies || !cookies.refreshToken) throw new Error('No refresh token in cookie !')
    const user = await User.findOneAndUpdate({refreshToken:cookies.refreshToken},{refreshToken:''},{new:true})
    res.clearCookie('refreshToken',{
        httpOnly:true,
        secure:true
    })
    return res.status(user ? 200 : 400).json({
        sucess: user ? true : false,
        mes:user ? 'Logout is successfully' : 'Logout is failed'
    })
})


//Post
const forgotPasswordEmail  = asyncHandler(async (req, res) => {
    const {email} = req.body
    if(!email) throw new Error('Missing email :((')
    const user = await User.findOne({ email })
    if (!user) throw new Error('User not found')
    const resetToken = user.createPasswordChangedToken()
    await user.save()
    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_CLIENT}/reset-password/${resetToken}>Click here</a>`

    const rs = await sendMail(email,html,"Forgot password")
    const isEmail = rs?.response?.includes('OK')
    return res.status(200).json({
        success:isEmail ? true : false,
        mes:isEmail?'Please check your email':'There was an error sending email'
    })
})



//Put
const resetPassword  = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if(!password || !token) throw new Error('Missing inputs :((')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Updated password' : 'Something went wrong'
    })
})

const getUsers = asyncHandler(async (req, res) => {
    //BUILD QUERY
    // 1A) Filtering
    const queryObj = { ...req.query }
    
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(el => delete queryObj[el])

    //1B) Advanced filtering gte | gt | lte | lt
    let queryString = JSON.stringify(queryObj)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)    
    const formateQueries = JSON.parse(queryString)


    if(queryObj?.name) formateQueries.name = {$regex : queryObj.name, $options: 'i'}
    if(queryObj?.searchPhoneEmail) {
        formateQueries.$or = [
            { mobile:  { $regex: '.*' + queryObj.searchPhoneEmail + '.*',$options: 'i' } },
            { email: { $regex: '.*' + queryObj.searchPhoneEmail + '.*',$options: 'i' } }
        ]
        delete formateQueries.searchPhoneEmail
    }
    
    let queryCommand = User.find(formateQueries).select('-refreshToken -password')

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
        const counts = await User.find(formateQueries).countDocuments()
        return res.status(200).json({
            success: response ? true : false,
            counts,
            users: response ? response : 'Cannot get users',  
        })
    })
    // response = await User.find().select('-refreshToken -password -role')
    //return res.status(200).json({
        //success: response ? true : false,
       // users: response
    //})
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!id) throw new Error('Missing inputs')
    const response = await User.findByIdAndDelete({_id:id})
    return res.status(200).json({
        success: response ? true : false,
        deletedUser: response ? `User with email ${response.email} deleted` : 'No user delete'
    })
})

const updateUser = asyncHandler(async (req, res) => {
    // 
    const { _id } = req.user
    const {email, firstname, lastname, mobile}  = req.body
    const data = {email, firstname, lastname, mobile}
    if(req.file) data.avatar = req?.file?.path
    if (!_id || !email || !firstname || !lastname || !mobile) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(_id, data, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Update user successful' : 'Some thing went wrong'
    })
})

const updateUserByAdmin = asyncHandler(async (req, res) => {
    // 
    const { uid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    })
})

const updateUserAddress = asyncHandler(async (req, res) => {
    // 
    const {_id} = req.user
    if (!req.body.address) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(_id,{address:req.body.address}, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    })
})


const updateUserCart = asyncHandler(async (req, res) => {
    // 
    const {_id} = req.user
    const {pid,quantity,color} = req.body
    if (!pid || !quantity || !color) throw new Error('Missing inputs')
    const cartUser = await User.findById(_id).select('cart')
    //const alreadyProduct = cartUser?.cart?.find(el => el.product.toString() === pid)
    const alreadyProduct = cartUser?.cart?.filter(el => el.product.toString() === pid)
    if(alreadyProduct){
        //const arrayProduct = cartUser?.cart?.filter(el => el.product.toString() === pid)
        //console.log("arrayProduct:",arrayProduct)
        const productByColor = alreadyProduct.find(el => el.color.toString() === color)
        if(productByColor){
            const response = await User.updateOne({cart:{$elemMatch: productByColor}},{$set:{"cart.$.quantity":quantity}},{new:true})
            return res.status(200).json({
                success: response ? true : false,
                updatedUserCart: response ? response : 'Some thing went wrong'
            })
        }else{
            const response = await User.findByIdAndUpdate(_id,{$push:{cart:{product:pid,quantity,color}}},{new:true}).select('-password -role -refreshToken')
            return res.status(200).json({
                success: response ? true : false,
                updatedUserCart: response ? response : 'Some thing went wrong'
            })
        }
    }else{
        const response = await User.findByIdAndUpdate(_id,{$push:{cart:{product:pid,quantity,color}}},{new:true}).select('-password -role -refreshToken')
        return res.status(200).json({
            success: response ? true : false,
            updatedUserCart: response ? response : 'Some thing went wrong'
        })
    }
})


module.exports = {
    register,
    login,
    current,
    refreshToken,
    logout,
    forgotPasswordEmail,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    updateUserAddress,
    updateUserCart,
    registerEmail,
    finalRegister,
}