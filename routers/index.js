const express = require("express")
const app = express()

const isAuth = require("../middlewares/isAuth")

const generalRouter = require("./generalRouter.js")
const authRouter = require("./authRouter.js")
const userRouter = require("./userRouter.js")

app.use("/", generalRouter)
app.use("/auth", authRouter)
app.use("/user", isAuth, userRouter)

module.exports = app