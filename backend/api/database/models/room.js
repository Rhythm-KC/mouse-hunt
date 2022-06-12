const mongoose = require('mongoose');

const checkListSchema= mongoose.Schema({
    noOfTraps:{
        type:Number,
        default:0
    },
    trapsChecked:{
        type:Map,
        of:Boolean,
        default:false
    },
    mouseFound:{
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
    data:{
        type:Map,
        of:checkListSchema
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