const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()


app.use(cors({
    origin:process.env.URL_CLIENT
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',(req,res)=>{res.send('app run')})


const port = process.env.PORT || 8888

app.listen(port,()=>{console.log('Server is runing on the port '+ port)})