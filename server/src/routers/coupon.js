const router = require('express').Router()
const controllers = require('../controllers/coupon')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')




router.get('/', controllers.getCoupons)
router.get('/:pid', controllers.getCoupon)

router.post('/', [verifyAccessToken, isAdmin], controllers.createCoupon)
router.put('/:pid', [verifyAccessToken, isAdmin], controllers.updateCoupon)
router.delete('/:pid', [verifyAccessToken, isAdmin], controllers.deleteCoupon)



module.exports = router