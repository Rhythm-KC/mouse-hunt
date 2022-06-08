const mongoose = require('mongoose');

const checkListSchema= new mongoose.Schema({
    noOfTraps:{
        type:Number,
        default:0
    },
    trapsChecked:{
        type:Boolean,
        default:false
    },
    mouseFound:{
        type:Boolean,
        default:false
    }
})
const roomSchema = new mongoose.Schema({
    roomNo: {
        type: Number,
        required:true,
    },
    floor:{
        type: Number,
        required: true
    },
    data:{
        type:Map,
        of:checkListSchema
    }

})

const Room = mongoose.model("Room", roomSchema);
modoule.export= Room; 