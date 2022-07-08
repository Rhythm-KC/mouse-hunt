const express = require('express')
const router = express.Router()

const {verifyToken, loginUser, createUser, logout} = require("../controllers/userContoller")
const {protect} = require("../middleware/authMiddleware")
router.post("/createUser",protect, createUser)
router.get("/logout",protect,logout)
router.post("/login",loginUser)

router.get("/verify", verifyToken)

module.exports = router