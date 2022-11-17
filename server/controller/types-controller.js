require('dotenv').config({path:__dirname+'/./../../.env'})

const express = require("express");

const router = express.Router();

// Konstanty
const constants = require('../const');

// ABL
const ListAbl = require('../abl/types/list-abl');
const CreateAbl = require('../abl/types/create-abl');
const DeleteAbl = require('../abl/types/delete-abl');
const GetAbl = require('../abl/types/get-abl');

router.get("/list", constants.authenticateToken, async (req, res) => {
    await ListAbl(req, res);
});

router.post("/create", constants.authenticateToken, async (req, res) => {
    await CreateAbl(req, res);
});

router.post("/delete", constants.authenticateToken, async (req, res) => {
    await DeleteAbl(req, res);
});

router.post("/get", constants.authenticateToken, async (req, res) => {
    await GetAbl(req, res);
});

module.exports = router;