const crypto = require("crypto");
const mysql = require('mysql2/promise');
const express = require("express");
const cors = require("cors");
const mysqlSync = require('sync-mysql');

const app = express();

app.use(express.json());
app.use(cors());

// Konstanty
const constants = require('../const');

let connection;
class RunsDao {

    async CreateRun(data) {
        connection = await this._connectDBSync();

        let sql = `INSERT INTO runs(id_sute, subject, teacher, start, length, canSign)
            VALUES(NULL, ${data.subject}, ${data.teacher}, '${data.start}', ${data.length}, ${data.canSign})`;
            console.log(sql)
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async UpdateRun(data) {
        connection = await this._connectDBSync();

        let sql = `UPDATE runs
            SET teacher = ${data.teacher}, start = '${data.start}', length = ${data.length}, canSign = ${data.canSign}
            WHERE id_sute = ${data.id}`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async AddStudentToRun(data) {
        connection = await this._connectDBSync();

        let sql = `INSERT INTO stu_ru (id_sturu, student, run)
            VALUES(NULL, ${data.student}, ${data.run})`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async GetRun(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT * FROM runs WHERE id_sute = ${data.id}`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async ListRuns() {
        connection = await this._connectDBSync();

        let sql = `SELECT * FROM runs`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async ListStudents(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT * FROM stu_ru WHERE run = ${data.id}`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async _connectDBSync() {
        let connectionSync = mysql.createPool(
            {
                host: constants.DB_HOST,
                user: constants.DB_USER,
                password: constants.DB_PWD,
                database: constants.DB_NAME
            }
        )

        return connectionSync;
    }
}

module.exports = RunsDao;