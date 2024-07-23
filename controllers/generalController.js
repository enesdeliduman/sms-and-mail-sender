const async = require("express-async-handler")
const User = require("../models/User")
const sendMail = require("../helpers/sendMail")
const mailTemplate = require("../public/html/indexPostMail")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const Mail = require("../models/Mail")

module.exports.index = async(async (req, res, next) => {
    const { email, message, subject } = req.body;
    const mail = mailTemplate(subject, message)
    await sendMail.sendMail({
        from: process.env.SITE_NAME,
        to: email,
        subject: subject,
        html: mail
    })
    await Mail.create({
        emailAddress: email,
        subject: subject,
        message: message,
        senderId:null
    })
    res.status(200).json({ success: true, message: "Mail send successfully" })
});