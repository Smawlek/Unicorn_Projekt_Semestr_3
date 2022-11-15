require('dotenv').config({path:__dirname+'/./../../.env'})

const express = require("express");

const router = express.Router();

// Konstanty
const constants = require('../const');

// ABL
const CreateAbl = require('../abl/runs/create-abl');
const UpdateAbl = require('../abl/runs/update-abl');
const AddStudentToRunAbl = require('../abl/runs/addStudentToRun-abl');

router.post("/create", constants.authenticateToken, async (req, res) => {
    await CreateAbl(req, res);
});

router.post("/update", constants.authenticateToken, async (req, res) => {
    await UpdateAbl(req, res);
});

router.post("/add-student", constants.authenticateToken, async (req, res) => {
    await AddStudentToRunAbl(req, res);
});

module.exports = router;