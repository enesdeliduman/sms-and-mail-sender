const async = require("express-async-handler")
const User = require("../models/User")
const sendMail = require("../helpers/sendMail")
// const sendSms = require("../helpers/sendSms")
const mailTemplate = require("../public/html/indexPostMail")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const Mail = require("../models/Mail")


module.exports.sendMail = async(async (req, res, next) => {
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
        senderId: req.user.id
    })
    res.status(200).json({ success: true, message: "Mail send successfully" })
});

module.exports.incoming = async(async (req, res, next) => {
    const mails = await Mail.findAll({
        where: {
            emailAddress: req.user.email
        },
        attributes:["subject","message","createdAt"]
    })
    res.status(200).json({ success: true, Incoming: mails })
});

module.exports.sent = async(async (req, res, next) => {
    const mails = await Mail.findAll({
        where: {
            senderId: req.user.id
        },
        attributes:["subject","message","emailAddress","createdAt"]
    })
    res.status(200).json({ success: true, Incoming: mails })
});