const express = require("express")
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errorHandler")
const connectDB = require('./config/dbConfig')
const port = process.env.PORT ||3000
const cookie_parse = require("cookie-parser")
const app = express()
connectDB()
app.use(cookie_parse())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use("/buildings", require("./routes/buildingRoutes.js"))
app.use("/analytics", require("./routes/analyticsRouter"))
app.use("/user", require("./routes/userRoutes"))

app.use(errorHandler)

app.listen(port, ()=>{console.log(`starting server at port ${port}`)})