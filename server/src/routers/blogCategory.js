const router = require('express').Router()
const controllers = require('../controllers/blogCategory')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')




router.get('/', controllers.getCategorys)
router.get('/:pid', controllers.getCategory)

router.post('/', [verifyAccessToken, isAdmin], controllers.createCategory)
router.put('/:pid', [verifyAccessToken, isAdmin], controllers.updateCategory)
router.delete('/:pid', [verifyAccessToken, isAdmin], controllers.deleteCategory)



module.exports = router