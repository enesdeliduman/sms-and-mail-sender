const express = require("express")
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config()
const app = express()

const { connectDB } = require("./Data/databaseConnect.js")
const { createDummyData } = require("./Data/dummyData.js")
const { ErrorHandler } = require("./middlewares/ErrorHandler.js")
const routers = require("./routers/index.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Router
app.use("/api", routers)
app.use(ErrorHandler);


connectDB()
// createDummyData()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening ${PORT}`)
})
