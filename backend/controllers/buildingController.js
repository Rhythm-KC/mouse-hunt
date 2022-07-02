const Building = require("../models/buildingModel")
const Floor = require("../models/floorModel")
const asyncHandler = require("express-async-handler")
const getBuildings = asyncHandler(async (req,res)=>{
    const building = await Building.find({})
    res.status(200).json({message:building})
})

const getBuilding = asyncHandler(async (req,res)=>{
    const building = await Building.findOne({BuildingID:req.params.id})
    if(building == null){
        res.status(404)
        throw new Error(`No building found wwith Building ID ${req.params.id}`)

    }else{
        res.status(200).json({message:building})
    }
})

const getFloors = asyncHandler(async (req,res)=>{
    const building = await Building.findOne({BuildingID:req.params.id})
    if(building == null){
        res.status(404)
        throw new Error(`No building found with Building ID ${req.params.id}`)
    }
    const floor = await Floor.find({Building_ID: building["_id"]})
    res.status(200).json({message:floor})
})

const getRooms = asyncHandler(async (req,res)=>{
    const rooms = await Building.aggregate([
        {$match:{Building_ID:req.params.id}},
        //{$lookup:{
        //    from: 'floors',
        //    localField:'_id',
        //    foreignField:"Building_ID",
        //    as:'floors'
//
        //}},
        
        //{$unwind:"$floors"}, 
        //{   
        //    $lookup:{
        //    from: "rooms",
        //    localField:"floors._id",
        //    foreignField:"Floor_ID",
        //    as:"rooms",
        //    }
        //},
        {
            $project:{
                "Building_ID":1,
                "floors":1
                //"rooms":1
            }
        }
        
    ])
    console.log(rooms)
    if(rooms.length == 0){
        res.status(404)
        throw new Error(`Cannot find Room`)
    }
    res.status(200).json({message:rooms})
})








module.exports = {
    getBuildings,
    getBuilding,
    getFloors,
    getRooms
}