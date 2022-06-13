const express = require('express');
const app = express()
const mongoose = require("./database/mongoose")
const {Room, Floor, Checklist} = require("./database/models/room")
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
        console.log(listofBuildings)
        res.send(listofBuildings)
    })
    .catch(error=>{
        res.send(500)
    })
})

//get all floors from a particular building
app.get('/floors/:buildingID', (req,res)=>{
    const buildingcode = req.params.buildingID
    Building.find({BuildingID:buildingcode},"_id")
    .then(building_id=>{
        if(building_id == null){
            res.sendStatus(404)
            return
        }
        Floor.find({Building_ID:building_id})
        .then(listoffloors=>{
            
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
        Floor.findOne({Building_ID:building_id,Level:level})
        .then(currentfloor=>{
            if (currentfloor != null){
                Room.find({Floor_ID:currentfloor})
                console.log()
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

//create a new checklist and log it in
app.post('/checklist/:buildingID/:level/:room', (req,res)=>{
    Building.find({BuildingID:req.params.buildingID})
    .then(building=>{
        if (building == null){
            res.sendStatus(404)
            return
        }
        Floor.find({Building_ID:building['_id'], Level:Number(req.params.level)}).then(
            floor=>{
                if (floor == null){
                    res.sendStatus(404)
                    return
                }
                Room.findOne({Floor_id:floor['_id'], RoomNo:Number(req.params.room)})
                .then(room=>{
                    if(room == null){
                        res.sendStatus(404)
                    }
                    new Checklist(req.body).save()
                    .then(checklist=>{
                        Room.updateOne({_id:room["_id"]},{$push:{
                          CheckList: checklist["_id"]
                        }})
                        .then(res.send(checklist))
                    })
                })
            }
        )
    })
    .catch(error=>{
        console.log(error)
    })
})

app.get("/checklists",(req,res)=>{
    Checklist.find({})
    .then(listofChecklist=>{
        
        res.send(listofChecklist);
    })
})

app.listen(3000)