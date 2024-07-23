const express = require("express")
const router = express.Router()

const generalController = require("../controllers/generalController")

router.post("/", generalController.index)

module.exports = router