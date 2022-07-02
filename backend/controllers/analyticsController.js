const Building = require("../models/buildingModel")
const Floor = require("../models/floorModel")
const Room = require("../models/roomModel")
const Checklist = require("../models/checklistModel")
const asyncHandler = require("express-async-handler")



const getDash = asyncHandler(async (req,res)=>{
    const dashData = await Building.aggregate([
        {}
    ])
})