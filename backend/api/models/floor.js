const mongoose = require('mongoose');

const floorScheme = mongoose.Schema({
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

const Floor= mongoose.model("Floor", floorScheme)
module.exports= Floor; 
