const Building = require("../models/buildingModel")
const Room = require("../models/roomModel")
const asyncHandler = require("express-async-handler")


const getDash = asyncHandler(async (req,res)=>{
    const dashData = await Room.aggregate([
        {
            $lookup:{
                from:"checklists",
                localField:"_id",
                foreignField:"Room_ID",
                as:"checklist"
                
            }
        },
        {
            $addFields:{
                MiceChecklistSum:{$sum:"$checklist.MouseFound"}
            }
        },
        {$group:{
            _id:null,
            totalTrapsNeeded:{$sum:"$NeedsReplaced"},
            totalMiceSum:{$sum:"$MiceChecklistSum"}
        }
        }
    ])
    if(dashData.length == 0){
        res.status(500)
        throw new Error("Dashboard Data couldnot be found")
    }
    res.status(200).json(dashData[0])
})

const getTable= asyncHandler(async (req,res)=>{
    var id = req.params.id
    if(id == undefined) {
        id = await Building.findOne({},{_id:0,BuildingID:1})
        id = id["BuildingID"]
    }
    const table = await Building.aggregate([
       {$match:{'BuildingID':id}},
       {$lookup:{
           from:"floors",
           localField:"_id",
           foreignField:"Building_ID",
           as: "Floor" 
       }},
       {$unwind: '$Floor'},
       {
           $lookup:{
               from: 'rooms',
               localField: "Floor._id",
               foreignField: "Floor_ID",
               as: "rooms"
           }
   
       },
       {
           $unwind:"$rooms"
       },
       {
           $lookup:{
               from:"checklists",
               localField:'rooms._id',
               foreignField:"Room_ID",
               as:"Micecount"
           }
       },
       {
           $project:{
               "_id":0,
               'BuildingID':1,
               "BuildingName":1,
               "Mnemonic":1,
               "rooms._id":1,
               "rooms.Floor_ID":1,
               "rooms.RoomNo":1,
               "rooms.TrapsInstalled":1,
               "rooms.NeedsReplaced":1,
               "rooms.Done":1,
               "totalMice":{$sum:"$Micecount.MouseFound"}
           }
       }
    ])
    if(table.length ==0){
        res.status(500)
        throw new Error("could not build table")
    }
    res.status(200).json(table)
}) 

module.exports ={
    getDash,
    getTable,
}