require('dotenv').config({path:__dirname+'/./../../.env'})

const express = require("express");

const router = express.Router();

// Konstanty
const constants = require('../const');

// ABL
const ListAbl = require('../abl/assigments/list-abl');
const CreateAbl = require('../abl/assigments/create-abl');
const UpdateAbl = require('../abl/assigments/update-abl');
const GetAbl = require('../abl/assigments/get-abl');

router.get("/list", constants.authenticateToken, async (req, res) => {
    await ListAbl(req, res);
});

router.post("/create", constants.authenticateToken, async (req, res) => {
    await CreateAbl(req, res);
});

router.post("/update", constants.authenticateToken, async (req, res) => {
    await UpdateAbl(req, res);
});

router.get("/get", constants.authenticateToken, async (req, res) => {
    await GetAbl(req, res);
});

module.exports = router;