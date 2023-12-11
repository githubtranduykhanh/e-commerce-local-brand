const router = require('express').Router()
const controllers = require('../controllers/insertData')



router.post('/product', controllers.insertProduct)

router.post('/category', controllers.insertCategory)




module.exports = router