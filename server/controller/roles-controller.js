require('dotenv').config({path:__dirname+'/./../../.env'})

const express = require("express");

const router = express.Router();

// Konstanty
const constants = require('../const');

// ABL
const ListAbl = require('../abl/roles/list-abl');

router.get("/list", constants.authenticateToken, async (req, res) => {
    await ListAbl(req, res);
});

module.exports = router;