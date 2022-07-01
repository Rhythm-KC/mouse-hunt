const { json } = require("express")
const asyncHandler = require("express-async-handler")
const Building = require("../models/building")


const getBuildings = asyncHandler( async (req,res)=>{
    const buildings = await Building.find()
    //console.log(buildings)
    res.status(404)
    //res.json(json.toString(buildings))
})




module.exports = {getBuildings}