const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()

const initRoutes = require('./src/routers')


app.use(cors({
    origin:process.env.URL_CLIENT
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))



initRoutes(app)

const port = process.env.PORT || 8888

app.listen(port,()=>{console.log('Server is runing on the port '+ port)})