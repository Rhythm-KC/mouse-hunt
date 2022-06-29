const express = require('express');
const mongoose = require('./database/mongoose')
const app = express()
const {floor,room, Checklist} = require("./database/models/room")
const Building= require("./database/models/building");

app.use(express.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// get all buildings
app.get('/buildings',(req,res)=>{
    Building.find({})
    .then(listofBuildings=>{
        if(listofBuildings == null){
            res.statusCode(404)
            return
        }
        else{
        res.send(listofBuildings)

        }
    })
    .catch(error=>{
        res.send(500)
    })
})

app.get('/floors/:buildingID', (req,res)=>{
    const buildingCode = req.params.buildingID
    Building.findOne({BuildingID:buildingCode},'_id')
    .then(id=>{
        if (id == null){
            res.sendStatus(404)
            return
        }
        floor.find({Building_ID:id})
        .then(floors=>{
            if (floors.length ==0){
                res.sendStatus(404)
                return
            }
            res.send(floors)
        })

    })
})

//get all floors from a particular building
app.get('/floor/:buildingID/:level', (req,res)=>{
    const buildingcode = req.params.buildingID
    const level = req.params.level
    Building.findOne({BuildingID:buildingcode},"_id")
    .then(building_id=>{
        if(building_id == null){
            res.sendStatus(404)
            return
        }
        floor.findOne({Building_ID:building_id, Level:level})
        .then(listoffloors=>{
            if(listoffloors == null){
                res.sendStatus(404)
                return
            }
            res.send(listoffloors)
        })
        .catch(error=>{
            console.log(error)
        })
    })
    .catch(error=>{
        console.log(error)
    })
})


app.post("/createBuilding",(req,res) =>{
    console.log(req.body)
    new Building(req.body).save().then(()=>{res.sendStatus(200)})
})

app.post("/addFloors/:bID",(req,res)=>{
    Building.findOne({BuildingID: req.params.bID})
    .then(building=>{
        if (building == null){
            res.sendStatus(404)
        }else{
            body = req.body
            body['Building_ID'] = building['_id']
            floor.find({Building_ID: building["_id"]})
            .then(floors =>{
                if (floors.length < building['TotalFloors'] ){
                    new floor(body).save().then(res.sendStatus(200))
                }else{
                    res.send(404)
                }
            
            })
        }
    })
})

//get all rooms of a floor of a building
app.get('/rooms/:buildingID/:level',(req,res)=>{
    const buildingcode = req.params.buildingID
    const level = parseInt(req.params.level) 
    Building.find({BuildingID:buildingcode},"_id")
    .then(building_id=>{
        if(building_id == null){
            res.sendStatus(404)
            return
        }
        floor.findOne({Building_ID:building_id,Level:level})
        .then(currentfloor=>{
            if (currentfloor != null){
                room.find({Floor_ID:currentfloor['_id']})
                .then(listofRooms=>{
                res.send(listofRooms)
                })
                .catch(error=> {console.log(error)})
            }else{
                res.sendStatus(404)
            }
        })
        .catch(error=> {console.log(error)})
    })
    .catch(error=> {console.log(error)})
})

app.post("/addRooms/:bid/:level",(req,res)=>{
    body =req.body
    console.log(body)
    Building.findOne({BuildingID: req.params.bid},"_id")
    .then((B_id)=>{
        if(B_id == null){
            res.sendStatus(404)
            return
        }
        floor.findOne({Building_ID: B_id, Level:req.params.level})
        .then(Cfloor=>{
            if(Cfloor == null){
                res.sendSend(404)
                return
            }
            room.find({Floor_ID:Cfloor["_id"]})
            .then(
                rooms =>{
                    if(rooms.length > Cfloor["FloorCapicity"]){
                        res.sendStatus(404)
                        return
                    }
                    body["Floor_ID"] = Cfloor["_id"]
                    console.log(body)
                    new room(body
                    ).save()
                    .then(res.sendStatus(200))
                }
            )
        })
    })
    .catch(err=>console.log(err))

    

})

//create a new checklist and log it in
app.post('/checklist/:buildingID/room', (req,res)=>{
    var Croom = req.body["room"];
    Croom["Floor_ID"] = new mongoose.Types.ObjectId(Croom["Floor_ID"])
    var checklist = req.body["mice"]

    room.findOneAndUpdate({Floor_ID:Croom["Floor_ID"],RoomNo:Number(Croom["RoomNo"])},
    {$set:{TrapsInstalled:Number(Croom["TrapsInstalled"]),Done:true, NeedsRepalced:Number(Croom["NeedsReplaced"]),TrapsChecked:Croom["TrapsChecked"]}
    })
    .then((newRoom)=>{
        console.log(newRoom)
        if(newRoom == null){
            res.sendStatus(404)
            return
        }
        new Checklist({Room_ID:newRoom["_id"], Date:Date.now(),MouseFound:checklist})
        .save()
        .then(()=>{room.find({Floor_ID:newRoom["Floor_ID"]})
            .then(listofRooms=>{
                res.send(listofRooms)
                console.log(listofRooms)
            })
        })
    })
})
app.get("/dashboard", (req,res)=>{
    room.aggregate([
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
    .then(
        (dash)=>{
            res.send(dash)
        }
    )
})

app.get("/table/:building", (req,res)=>{
    Building.aggregate([
        {$match:{'BuildingID':req.params.building}},
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
                as: "Floor.rooms"
            }
    
        },
        {
            $unwind:"$Floor.rooms"
        },
        {
            $lookup:{
                from:"checklists",
                localField:'Floor.rooms._id',
                foreignField:"Room_ID",
                as:"Floor.rooms.Micecount"
            }
        },
        {
            $project:{
                "_id":0,
                'BuildingID':1,
                "BuildingName":1,
                "Mnemonic":1,
                "Floor.rooms._id":1,
                "Floor.rooms.RoomNo":1,
                "Floor.rooms.TrapsInstalled":1,
                "Floor.rooms.NeedsReplaced":1,
                "Floor.rooms.totalMice":{$sum:"$Floor.rooms.Micecount.MouseFound"}

            }

        }

    ])
    .then(newVal=>{
        if(newVal.length == 0){
            res.sendStatus(404)
        }
        else{
            res.send(newVal)
        }
    })
    .catch(error=>{
        console.log(error)
        res.sendStatus(500)
    })
})
app.get("/checklists",(req,res)=>{
    Checklist.find({})
    .then(listofChecklist=>{
        
        res.send(listofChecklist);
    })
})

app.listen(3000)