const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    Passowrd:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        required:true
    }

})

module.exports =mongoose.model("User",userSchema)