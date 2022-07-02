const express = require('express')
const router = express.Router()
const {getBuildings, getBuilding,getFloors, getRooms} = require("../controllers/buildingController")

router.get("/",getBuildings)

router.get("/:id",getBuilding)

router.get("/:id/Floors", getFloors)

router.get("/:id/rooms", getRooms)

module.exports=router