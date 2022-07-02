const mongoose = require('mongoose')
const roomSchema = new mongoose.Schema({
    Floor_ID :{
        type:mongoose.Types.ObjectId,
        required:true
    },
    RoomNo: {
        type: Number,
        required:true,
    },
    TrapsInstalled:{
        type:Number,
        required:true,
        max:2,
        default:0
    },
    TrapsChecked:{
        type:Boolean,
        default:false,
    },
    NeedsReplaced:{
        type:Number,
        default:0
    },
    Done:{
        type:Boolean,
        default:false
    }
    
})

const Room = mongoose.model("Room", roomSchema)
module.exports = Room