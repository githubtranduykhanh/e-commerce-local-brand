const router = require('express').Router()
const controllers = require('../controllers/order')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')




router.get('/', controllers.getOrders)
router.get('/:pid', controllers.getOrder)

router.post('/', verifyAccessToken, controllers.createOrder)
router.put('/status/:oid', [verifyAccessToken, isAdmin], controllers.updateStatus)
router.put('/:pid', [verifyAccessToken, isAdmin], controllers.updateOrder)
router.delete('/:pid', [verifyAccessToken, isAdmin], controllers.deleteOrder)



module.exports = router