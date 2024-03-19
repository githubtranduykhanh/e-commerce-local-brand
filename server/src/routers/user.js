const router = require('express').Router()
const controllers = require('../controllers/user')
const {verifyAccessToken,isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../configs/cloudinary.config')

router.post('/register', controllers.registerEmail)
router.get('/finalregister/:token', controllers.finalRegister)
router.post('/login', controllers.login)
router.get('/current',verifyAccessToken, controllers.current)
router.get('/refreshtoken', controllers.refreshToken)
router.get('/logout', controllers.logout)
router.post('/forgotpasswordemail', controllers.forgotPasswordEmail)
router.put('/resetpassword', controllers.resetPassword)
router.get('/', [verifyAccessToken, isAdmin], controllers.getUsers)
router.delete('/:id', [verifyAccessToken, isAdmin], controllers.deleteUser)
router.put('/current', [verifyAccessToken,uploader.single('avatar')], controllers.updateUser)
router.put('/address', verifyAccessToken, controllers.updateUserAddress)
router.put('/cart', verifyAccessToken, controllers.updateUserCart)
router.put('/:uid', [verifyAccessToken, isAdmin], controllers.updateUserByAdmin)

module.exports = router


// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETEeee
// CREATE (POST) + PUT - body
// GET + DELETE - query // ?fdfdsf&fdfs