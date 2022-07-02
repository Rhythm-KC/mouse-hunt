const mongoose = require("mongoose")

const buildingSchema = mongoose.Schema({
    BuildingID:{
        type:String,
        require:true
    },
    BuildingName:{
        type:String,
        require:true
    },
    Mnemonic:{
        type:String,
        require:true
    },
    TotaFloors:{
        type:Number,
        require:true
    },
    Done:{
        type:Boolean,
        default:false
    }

})

const Building = mongoose.model("Building", buildingSchema)
module.exports = Building