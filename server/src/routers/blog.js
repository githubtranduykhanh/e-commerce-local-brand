const router = require('express').Router()
const controllers = require('../controllers/blog')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../configs/cloudinary.config')



router.get('/', controllers.getBlogs)
router.get('/:pid', controllers.getBlog)


router.put('/updateimage/:pid', [verifyAccessToken, isAdmin, uploader.single('image')], controllers.updateImage)
router.post('/', [verifyAccessToken, isAdmin], controllers.createBlog)
router.put('/:pid', [verifyAccessToken, isAdmin], controllers.updateBlog)
router.delete('/:pid', [verifyAccessToken, isAdmin], controllers.deleteBlog)
router.put('/like/:pid', verifyAccessToken, controllers.likeBlog)
router.put('/dislike/:pid', verifyAccessToken, controllers.dislikeBlog)



module.exports = router