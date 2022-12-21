require('dotenv').config({path:__dirname+'/./../../.env'})

const express = require("express");

const router = express.Router();

// Konstanty
const constants = require('../const');

// ABL
const CreateAbl = require('../abl/fields/create-abl');
const UpdateAbl = require('../abl/fields/update-abl');
const ListAbl = require('../abl/fields/list-abl');
const GetAbl = require('../abl/fields/get-abl');

router.post("/create", constants.authenticateToken, async (req, res) => {
    await CreateAbl(req, res);
});

router.post("/update", constants.authenticateToken, async (req, res) => {
    await UpdateAbl(req, res);
});

router.get("/list", async (req, res) => {
    await ListAbl(req, res);
});

router.get("/get", async (req, res) => {
    await GetAbl(req, res);
});

module.exports = router;