require('dotenv').config({path:__dirname+'/./../../.env'})

const express = require("express");

const router = express.Router();

// Konstanty
const constants = require('../const');

// ABL
const CreateAbl = require('../abl/ratings/create-abl');
const UpdateAbl = require('../abl/ratings/update-abl');
const DeleteAbl = require('../abl/ratings/delete-abl');
const GetAbl = require('../abl/ratings/get-abl');
const ListAbl = require('../abl/ratings/list-abl');

router.post("/create", constants.authenticateToken, async (req, res) => {
    await CreateAbl(req, res);
});

router.post("/updae", constants.authenticateToken, async (req, res) => {
    await UpdateAbl(req, res);
});

router.post("/delete", constants.authenticateToken, async (req, res) => {
    await DeleteAbl(req, res);
});

router.get("/get", constants.authenticateToken, async (req, res) => {
    await GetAbl(req, res);
});

router.get("/list", constants.authenticateToken, async (req, res) => {
    await ListAbl(req, res);
});

module.exports = router;