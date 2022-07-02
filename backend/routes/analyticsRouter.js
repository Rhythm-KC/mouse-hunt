const express = require('express')
const router = express.Router()

router.get("/dash",getDash)
router.get("/table",getTable)
router.get("/table/:id",getTable)


module.exports=router