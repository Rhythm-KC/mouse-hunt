const express = require("express")
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errorHandler")
const connectDB = require('./config/dbConfig')
const port = process.env.PORT ||3000

const app = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/buildings", require("./routes/buildingRoutes.js"))

app.use(errorHandler)

app.listen(port, ()=>{console.log(`starting server at port ${port}`)})