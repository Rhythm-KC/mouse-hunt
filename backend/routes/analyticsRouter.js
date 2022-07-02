const express = require('express')
const router = express.Router()
const {getDash,getTable} = require("../controllers/analyticsController")

router.get("/dashboard",getDash)
router.get("/table",getTable)
router.get("/table/:id",getTable)


module.exports=router