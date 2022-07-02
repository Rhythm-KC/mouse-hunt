const Building = require("../models/buildingModel")
const Floor = require("../models/floorModel")
const Room = require("../models/roomModel")
const Checklist = require("../models/checklistModel")
const asyncHandler = require("express-async-handler")

// Get the list of all buildings form the database
const getBuildings = asyncHandler(async (req,res)=>{
    const building = await Building.find({})
    res.status(200).json(building)
})

//Get only the building with the given parameter(BuildingID)
const getBuilding = asyncHandler(async (req,res)=>{
    const building = await Building.findOne({BuildingID:req.params.id})
    if(building == null){
        res.status(404)
        throw new Error(`No building found wwith Building ID ${req.params.id}`)

    }else{
        res.status(200).json(building)
    }
})

//Gets all the from the given building
const getFloors = asyncHandler(async (req,res)=>{
    const building = await Building.findOne({BuildingID:req.params.id})
    if(building == null){
        res.status(404)
        throw new Error(`No building found with Building ID ${req.params.id}`)
    }
    const floor = await Floor.find({Building_ID: building["_id"]})
    res.status(200).json(floor)
})

//Gets all the Rooms of a Building of particular level
const getRooms = asyncHandler(async (req,res)=>{
    const rooms = await Building.aggregate([
        {$match:{BuildingID:req.params.id}},
        {$lookup:{
            from: 'floors',
            let:{b_id:"$_id"},
            pipeline:[
               {
                $match:{
                    $expr:{
                        $and:[
                            {$eq:["$Level",Number(req.params.level)]},
                            {$eq:["$Building_ID","$$b_id"]},

                        ]
                    }
                
                }
               } 
            ],
            as:'floors'

        }},
        
        {   
            $lookup:{
            from: "rooms",
            localField:"floors._id",
            foreignField:"Floor_ID",
            as:"rooms",
            }
        },

        {
            $project:{
                'rooms':1,
            }
        }

    ])

    if(rooms.length == 0){
        res.status(404)
        throw new Error(`Cannot find Room`)
    }
    res.status(200).json(rooms[0]["rooms"])
})

const addChecklist = asyncHandler( async (req,res)=>{
    const body = req.body
    const room = body['room']
    const mice = Number(body['miceFound'])
    const newRoom = await Room.findOneAndUpdate({_id: mongoose.Types.ObjectId(room["_id"])},
        {$set:{TrapsInstalled:room['TrapsInstalled'], TrapsChecked:room["TrapsChecked"], NeedsReplaced:room["NeedsReplaced"]}} 
    )
    if(newRoom == null){
        res.status(404)
        throw new Error("cannot find Room")
    }
    const checklist = await (new Checklist({
        Room_ID: newRoom[_id],
        MouseFound:mice 
    })).save()
    if(checklist == null){
       res.status(500) 
       throw new Error("could not create checklist")
    }
    res.send(200)
})








module.exports = {
    getBuildings,
    getBuilding,
    getFloors,
    getRooms,
    addChecklist
}