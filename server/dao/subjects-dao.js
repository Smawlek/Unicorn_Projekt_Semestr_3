const crypto = require("crypto");
const mysql = require('mysql2/promise');
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Konstanty
const constants = require('../const');
// Helpers
const Helpers = require('../helpers');
const helper = new Helpers();

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

        let sql = `SELECT s.id_su AS 'id', s.creator, s.name, s.description, s.field AS 'field_id', f.name AS 'field_name', s.howManyWeeks, s.weekDescription, 
        s.teacher AS 'teacher_id', u.name AS 'teacher_name', s.active AS 'active'
        FROM subjects s
        JOIN fields f ON f.id_fi = s.field
        JOIN users u ON u.id_us = s.teacher`;
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

        let sql = `SELECT s.*, u.name AS 'teacher_name', f.name AS 'field_name'
        FROM subjects s 
        JOIN users u ON u.id_us = s.teacher 
        JOIN fields f ON f.id_fi = s.field
        WHERE id_su = ${data.id}`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async AlterActivity(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT active FROM subjects WHERE id_su = ${data.id}`;
        let [res] = await connection.query(sql);
        sql = `UPDATE subjects SET active = ${!res[0].active} WHERE id_su = ${data.id}`;
        let [response] = await connection.query(sql);

        connection.end();

        return JSON.stringify(response);
    }

    async IsUserSigned(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT * FROM stu_ru WHERE run = ${data.run} AND student = ${data.student}`;
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