const router = require('express').Router()
const controllers = require('../controllers/user')


router.post('/register', controllers.register)
router.post('/login', controllers.login)


module.exports = router


// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETEeee
// CREATE (POST) + PUT - body
// GET + DELETE - query // ?fdfdsf&fdfs