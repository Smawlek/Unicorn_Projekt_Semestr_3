require('dotenv').config({path:__dirname+'/./../../.env'})

const express = require("express");

const router = express.Router();

// Konstanty
const constants = require('../const');

// ABL
const LoginAbl = require("../abl/user/login-abl");
const CreateAbl = require('../abl/user/create-abl');
const ListAbl = require('../abl/user/list-abl');
const GetAbl = require('../abl/user/get-abl');
const UpdateAbl = require('../abl/user/update-abl');

router.get("/login", async (req, res) => {
    await LoginAbl(req, res);
});

router.post("/create", constants.authenticateToken, async (req, res) => {
    await CreateAbl(req, res);
});

router.get("/list", constants.authenticateToken, async (req, res) => {
    await ListAbl(req, res);
});

router.get("/get", constants.authenticateToken, async (req, res) => {
    await GetAbl(req, res);
});

router.post("/update", constants.authenticateToken, async (req, res) => {
    await UpdateAbl(req, res);
});

module.exports = router;