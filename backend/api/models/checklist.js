const mongoose = require('mongoose');

const checkListSchema= new mongoose.Schema({
    Room_ID:{
        type: mongoose.Types.ObjectId,
        required:true
    },
    Date:{
        type:Date,
        default:Date()
    },
    MouseFound:{
        type:Number,
        required:true,
    },
})
const Checklist= mongoose.model("Checklist", checkListSchema)
module.exports= Checklist; 