const mongoose = require('mongoose');

const buildingScheme= mongoose.Schema({
    BuildingName: {
        type: String,
        required:true,
    },
    Mnemonic:{
        type:String,
        max:3,
        required:true,
    },
    BuildingID:{
        type:String,
        required:true, 
        max:4,
        min:2
    },
    TotalFloors:{
        type:Number,
        required: true
    },
    floors:{
        type:Number,
        default:0
    }

})

module.exports = mongoose.model("Building", buildingScheme)