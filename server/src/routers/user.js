const router = require('express').Router()
const controllers = require('../controllers/user')
const {verifyAccessToken,isAdmin} = require('../middlewares/verifyToken')

router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.get('/current',verifyAccessToken, controllers.current)
router.get('/refreshtoken', controllers.refreshToken)
router.get('/logout', controllers.logout)
router.get('/forgotpasswordemail', controllers.forgotPasswordEmail)
router.post('/resetpassword', controllers.resetPassword)
router.get('/', [verifyAccessToken, isAdmin], controllers.getUsers)
router.delete('/:id', [verifyAccessToken, isAdmin], controllers.deleteUser)
router.put('/current', [verifyAccessToken], controllers.updateUser)
router.put('/:uid', [verifyAccessToken, isAdmin], controllers.updateUserByAdmin)


module.exports = router


// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETEeee
// CREATE (POST) + PUT - body
// GET + DELETE - query // ?fdfdsf&fdfs