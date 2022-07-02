const express = require('express')
const router = express.Router()
const {getBuildings, getBuilding,getFloors, getRooms, addChecklist} = require("../controllers/buildingController")

router.get("/",getBuildings)

router.get("/:id",getBuilding)

router.get("/:id/floors", getFloors)

router.get("/:id/:level/rooms", getRooms)

router.post('/checklist', addChecklist)

module.exports=router