const mongoose = require("mongoose")

const checklistSchema = new mongoose.Schema({
    Room_ID:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now()
    },
    MouseFound:{
        type:Number,
        required:true
    }

})

const Checklist = mongoose.model("Checklist", checklistSchema)
module.exports = Checklist