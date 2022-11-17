const crypto = require("crypto");
const mysql = require('mysql2/promise');
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Konstanty
const constants = require('../const');

let connection;
class SubjectsDao {

    async CreateSubject(data) {
        connection = await this._connectDBSync();

        let sql = `INSERT INTO subjects(id_su, creator, name, description, field, howManyWeeks, weekDescription, teacher, active)
            VALUES(NULL, ${data.creator}, '${data.name}', '${data.description}', ${data.field}, ${data.howManyWeeks}, 
            '${data.weekDescription}', ${data.teacher}, ${data.active})`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async ListSubjects() {
        connection = await this._connectDBSync();

        let sql = `SELECT * FROM subjects`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async UpdateSubject(data) {
        connection = await this._connectDBSync();

        let sql = `UPDATE subjects
        SET name = '${data.name}', description = '${data.description}', field = ${data.field}, 
        howManyWeeks = ${data.howManyWeeks}, weekDescription = "${data.weekDescription}", teacher = ${data.teacher}, 
        active = ${data.active}
        WHERE id_su = ${data.id}`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async GetSubject(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT * FROM subjects WHERE id_su = ${data.id}`;
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

module.exports = SubjectsDao;