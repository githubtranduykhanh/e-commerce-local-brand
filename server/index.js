const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express()
const {dbConnect} = require('./src/configs/dbConnect')
const initRoutes = require('./src/routers')


app.use(cors({
    origin:process.env.URL_CLIENT,
    credentials:true //Lưu cookie trên trình duyệt cùng với cấu hình withCredentials:true axios
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


dbConnect()
initRoutes(app)

const port = process.env.PORT || 8888

app.listen(port,()=>{console.log('Server is runing on the port '+ port)})