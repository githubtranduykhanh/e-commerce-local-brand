const router = require('express').Router()
const controllers = require('../controllers/insertData')



router.post('/product', controllers.insertProduct)

router.post('/category', controllers.insertCategory)
router.post('/users', controllers.createUsers)
router.post('/roles', controllers.createRoles)




module.exports = router