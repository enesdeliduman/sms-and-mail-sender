"use strict";
const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "59ccf3ba",
    apiSecret: "9hGtfz3DqHU1Om1s"
  })
module.exports = vonage;
