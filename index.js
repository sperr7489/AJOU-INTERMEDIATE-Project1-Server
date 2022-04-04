const express = require("./config/express");
const secret = require("./config/secret");

express().listen(secret.port, () => console.log(`API Server Start At Port ${secret.port}`));

module.exports = express();