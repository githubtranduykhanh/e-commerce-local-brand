const router = require('express').Router()
const controllers = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../configs/cloudinary.config')


router.post('/', [verifyAccessToken, isAdmin], controllers.createProduct)
router.get('/', controllers.getProducts)



router.put('/updateimage/:pid', [verifyAccessToken, isAdmin, uploader.array('images',10)], controllers.updateImage)
router.put('/:pid', [verifyAccessToken, isAdmin], controllers.updateProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin], controllers.deleteProduct)
router.get('/:pid', controllers.getProduct)
router.post('/ratings',verifyAccessToken, controllers.ratings)


module.exports = router