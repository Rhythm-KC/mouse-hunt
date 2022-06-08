const mongoose = require('mongoose');

const buildingScheme= new mongoose.Schema({
    buildingName: {
        type: String,
        required:true,
    },
    buildingNo:{
        type:Number,
        required:true 
    },
    totalFloors:{
        type:Number,
        required: true
    },
    rooms:{
        type:[mongoose.Types.ObjectId],
        required:true
    }

})

const Building = mongoose.model("Building", buildingScheme);
modoule.export= Building; 