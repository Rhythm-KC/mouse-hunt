const mongoose = require('mongoose');
const { schema } = require('./building');

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

const floorScheme = new mongoose.Schema({
    Building_ID: {
        type: mongoose.Types.ObjectId,
        required:true
    },
    Level:{
        type:Number,
        required:true
    },
    FloorCapicity:{
        type :Number,
        required:true
    },
    Done:{
        type:Boolean,
        default:false
    }
})

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

const room = mongoose.model("Room", roomSchema)
const Checklist = mongoose.model("CheckList", checkListSchema)
const floor = mongoose.model("Floor", floorScheme)
module.exports= {floor,room,Checklist}; 