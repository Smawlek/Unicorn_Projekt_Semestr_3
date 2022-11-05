require('dotenv').config({path:__dirname+'/./../../.env'})

const express = require("express");

const router = express.Router();

// Konstanty
const constants = require('../const');

// ABL
const LoginAbl = require("../abl/user/login-abl");


router.get("/login", async (req, res) => {
    await LoginAbl(req, res);
});

module.exports = router;