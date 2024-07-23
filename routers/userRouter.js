const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")

router.post("/send-mail", userController.sendMail)
// router.post("/send-sms", userController.sendSms)
router.get("/incoming", userController.incoming)
router.get("/sent", userController.sent)

module.exports = router