const express = require('express')
const router = express.Router()
const {getBuildings, getBuilding,getFloors, getRooms, addChecklist} = require("../controllers/buildingController")
const {protect} = require("../middleware/authMiddleware")
router.get("/",protect,getBuildings)

router.get("/:id",protect,getBuilding)

router.get("/:id/floors",protect, getFloors)

router.get("/:id/:level/rooms",protect, getRooms)

router.post('/checklist',protect, addChecklist)

module.exports=router