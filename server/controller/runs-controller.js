require('dotenv').config({path:__dirname+'/./../../.env'})

const express = require("express");

const router = express.Router();

// Konstanty
const constants = require('../const');

// ABL
const CreateAbl = require('../abl/runs/create-abl');
const UpdateAbl = require('../abl/runs/update-abl');
const AddStudentToRunAbl = require('../abl/runs/addStudentToRun-abl');
const GetAbl = require('../abl/runs/get-abl');
const ListAbl = require('../abl/runs/list-abl');
const ListStudentsAbl = require('../abl/runs/listStudents-abl');
const AlterActivityOfRunAbl = require('../abl/runs/alterActivityOfRun-abl');
const SignUnsignStudentFromRunAbl = require('../abl/runs/signUnsignStudentFromRun-abl');
const GetRunsStudentByAssigmentAbl = require('../abl/runs/getRunsStudentByAssigment-abl');
const GetRunByStudentAbl = require('../abl/runs/getRunByStudent-abl');
const GetStudentsRunsAbl = require('../abl/runs/getStudentsRuns-abl');
const GetTeachersRunsAbl = require('../abl/runs/getTeachersRuns-abl');

router.post("/create", constants.authenticateToken, async (req, res) => {
    await CreateAbl(req, res);
});

router.post("/update", constants.authenticateToken, async (req, res) => {
    await UpdateAbl(req, res);
});

router.post("/add-student", constants.authenticateToken, async (req, res) => {
    await AddStudentToRunAbl(req, res);
});

router.get("/get", constants.authenticateToken, async (req, res) => {
    await GetAbl(req, res);
});

router.get("/list", constants.authenticateToken, async (req, res) => {
    await ListAbl(req, res);
});

router.get("/list-students", constants.authenticateToken, async (req, res) => {
    await ListStudentsAbl(req, res);
});

router.post("/alter-activity", constants.authenticateToken, async (req, res) => {
    await AlterActivityOfRunAbl(req, res);
});

router.get("/get-run-by-student", constants.authenticateToken, async (req, res) => {
    await GetRunByStudentAbl(req, res);
});

router.post("/sign-unsign-student", constants.authenticateToken, async (req, res) => {
    await SignUnsignStudentFromRunAbl(req, res);
});

router.get("/get-students-by-assigment", constants.authenticateToken, async (req, res) => {
    await GetRunsStudentByAssigmentAbl(req, res);
});

router.get("/get-students-runs", constants.authenticateToken, async (req, res) => {
    await GetStudentsRunsAbl(req, res);
});

router.get("/get-teachers-runs", constants.authenticateToken, async (req, res) => {
    await GetTeachersRunsAbl(req, res);
});

module.exports = router;