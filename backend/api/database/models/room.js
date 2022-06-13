const mongoose = require('mongoose');

const checkListSchema= new mongoose.Schema({
    Date:{
        type:Date,
        default:Date.now()
    },
    TrapsInstalled:{
        type:Number,
        default:0
    },
    TrapChecked:{
        type:Map,
        of:Boolean,
        default:false
    },
    MouseFound:{
        type:Map,
        of:Boolean,
        default:false
    },
    NeedsReplaced:{
        type:Map,
        of:Boolean,
        default:false
    }
})

const roomSchema = new mongoose.Schema({
    RoomNo: {
        type: Number,
        required:true,
    },
    Floor_ID:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    CheckList:{
        type: Array,
        required: true
    }
})

const floorSchema = new mongoose.Schema({

    Building_ID:{
        type: mongoose.Types.ObjectId,
        required:true,
    },
    Level:{
        type:Number,
        required:true,
    },
    TotalRooms:{
        type:Number,
        required: true
    },
    rooms:{
        type:Number,
        default:0
    }
})

const Room = mongoose.model("Room", roomSchema);
const Floor = mongoose.model("Floor", floorSchema);
const Checklist = mongoose.model("CheckList", checkListSchema)
module.exports= {Room,Floor,Checklist}; 