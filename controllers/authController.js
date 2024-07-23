const async = require("express-async-handler")
const User = require("../models/User")
const sendMail = require("../helpers/sendMail")
const resetPassword = require("../public/html/resetPassword")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

module.exports.register = async(async (req, res, next) => {
    const { username, password, email } = req.body;
    const user = await User.create({
        email: email,
        username: username,
        password: password
    });
    res.status(201).json({ message: 'User created successfully', user });
});

module.exports.login = async(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: {
            username: username
        }
    })
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" })
    }
    if (!await user.comparePassword(password)) {
        return res.status(401).json({ success: false, message: "Correct password" })
    }
    const token = user.createJWTToken()
    return res.status(200).json({ success: true, token: token })
});

module.exports.forgotPassword = async(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({
        where: {
            email: email
        }
    })
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" })
    }
    const code = crypto.randomBytes(32).toString("hex");
    user.resetPasswordCode = code;
    user.resetPasswordCurrentTime = Date.now() + 1800000
    await user.save()

    const mail = resetPassword(user.username, code)

    await sendMail.sendMail({
        from: process.env.SITE_NAME,
        to: user.email,
        subject: "Reset password",
        html: mail
    })
    return res.status(200).json({ success: true, message: "The password reset link has been sent by e-mail." })
});


module.exports.resetPassword = async(async (req, res, next) => {
    const { password } = req.body;
    const user = await User.findOne({
        where: {
            resetPasswordCode: req.params.token
        }
    })
    if (!user || user.resetPasswordCurrentTime > Date.now) {
        return res.status(404).json({ success: false, message: "Incorrect or expired code" })
    }
    user.password = password
    user.resetPasswordCode = null;
    user.resetPasswordCurrentTime = null
    await user.save()

    return res.status(200).json({ success: true, message: "Your password has been successfully renewed" })
});