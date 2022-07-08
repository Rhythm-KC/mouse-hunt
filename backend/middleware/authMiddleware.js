const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const protect = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.cookies.access_token){
        try{
            token = req.cookies.access_token
            const decode = jwt.decode(token, process.env.JWT_SECRET)
            req.user = await User.findOne({_id:decode.id, Role:decode.role}).select("-Password")
            next()
        }catch(err){
            res.status(401)
            throw new Error("Not authorized")
        }
    }
    if(!token){
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})

module.exports = {protect}