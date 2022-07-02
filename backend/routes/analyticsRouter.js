const express = require('express')
const router = express.Router()
const {getDash,getTable} = require("../controllers/analyticsController")

router.get("/dash",getDash)
router.get("/table",getTable)
router.get("/table/:id",getTable)


module.exports=router