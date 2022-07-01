const express = require("express")
const router = express.Router()
const {getBuildings} = require("../controllers/buildingController")

router.get("/", getBuildings)




module.exports = router