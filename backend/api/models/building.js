const mongoose = require('mongoose');

const buildingScheme = mongoose.Schema({
    BuildingID:{
        type:String,
        required:true, 
        max:4,
        min:2
    },
    BuildingName: {
        type: String,
        required:true,
    },
    Mnemonic:{
        type:String,
        max:3,
        required:true,
    },
    TotalFloors:{
        type:Number,
        required: true
    },
    Done:{
        type:Boolean,
        default:false
    }

})
 
module.exports= mongoose.model("Building", buildingScheme)