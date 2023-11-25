const router = require('express').Router()
const controllers = require('../controllers/brand')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')




router.get('/', controllers.getBrands)
router.get('/:pid', controllers.getBrand)

router.post('/', [verifyAccessToken, isAdmin], controllers.createBrand)
router.put('/:pid', [verifyAccessToken, isAdmin], controllers.updateBrand)
router.delete('/:pid', [verifyAccessToken, isAdmin], controllers.deleteBrand)



module.exports = router