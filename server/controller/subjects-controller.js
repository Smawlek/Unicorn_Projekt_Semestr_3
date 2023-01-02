require('dotenv').config({path:__dirname+'/./../../.env'})

const express = require("express");

const router = express.Router();

// Konstanty
const constants = require('../const');

// ABL
const CreateAbl = require('../abl/subjects/create-abl');
const ListAbl = require('../abl/subjects/list-abl');
const UpdateAbl = require('../abl/subjects/update-abl');
const GetAbl = require('../abl/subjects/get-abl');
const AlterActivityAbl = require('../abl/subjects/alterActivity-abl');
const IsUserSignedAbl = require('../abl/subjects/isUserSigned-abl');

router.post("/create", constants.authenticateToken, async (req, res) => {
    await CreateAbl(req, res);
});

router.get("/list", async (req, res) => {
    await ListAbl(req, res);
});

router.post("/update", constants.authenticateToken, async (req, res) => {
    await UpdateAbl(req, res);
});

router.get("/get", async (req, res) => {
    await GetAbl(req, res);
});

router.post("/alter-activity", constants.authenticateToken, async (req, res) => {
    await AlterActivityAbl(req, res);
});

router.get("/is-user-signed", constants.authenticateToken, async (req, res) => {
    await IsUserSignedAbl(req, res);
});

module.exports = router;