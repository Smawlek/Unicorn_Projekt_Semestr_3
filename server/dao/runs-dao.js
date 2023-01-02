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

        let sql = `INSERT INTO runs(id_sute, subject, teacher, start, length, canSign, capacity)
            VALUES(NULL, ${data.subject}, ${data.teacher}, '${data.start}', ${data.length}, ${data.canSign}, ${data.capacity})`;
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

        let sql = `SELECT r.*, u.name AS 'teacher_name', s.name AS 'subject_name', s.field, f.name AS 'field_name', (SELECT COUNT(student) FROM stu_ru WHERE run = r.id_sute) AS 'signed_students'
        FROM runs r
        JOIN users u ON u.id_us = r.teacher
        JOIN subjects s ON s.id_su = r.subject
        JOIN fields f ON f.id_fi = s.field
        WHERE id_sute = ${data.id}`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async ListRuns() {
        connection = await this._connectDBSync();

        let sql = `SELECT r.*, u.name AS 'teacher_name', s.name AS 'subject_name', s.field, f.name AS 'field_name', (SELECT COUNT(student) FROM stu_ru WHERE run = r.id_sute) AS 'signed_students'
        FROM runs r
        JOIN users u ON u.id_us = r.teacher
        JOIN subjects s ON s.id_su = r.subject
        JOIN fields f ON f.id_fi = s.field`;
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

    async AlterActivityOfRun(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT canSign FROM runs WHERE id_sute = ${data.id}`;
        let [res] = await connection.query(sql);
        sql = `UPDATE runs SET canSign = ${Number(res[0].canSign) === 0 ? 1 : 0} WHERE id_sute = ${data.id}`;
        let [response] = await connection.query(sql);

        connection.end();

        return JSON.stringify(response);
    }

    async GetRunByStudent(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT run FROM stu_ru WHERE student = ${data.id}`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async SignUnsignStudentFromRun(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT run FROM stu_ru WHERE student = ${data.id} AND run = ${data.run}`;
        let [res] = await connection.query(sql);

        if(res.length <= 0) {
            sql = `INSERT INTO stu_ru(id_sturu, student, run) VALUES(NULL, ${data.id}, ${data.run})`;
        } else {
            sql = '';
        }
        
        let [response] = await connection.query(sql);

        connection.end();

        return JSON.stringify(response);
    }

    async GetRunsStudentByAssigment(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT sr.id_sturu AS 'sturu_id', sr.student AS 'student_id', u.name AS 'student_name', a.maxPoints, a.id_as AS 'assigment_id', 
            (SELECT ra.points FROM ratings ra WHERE ra.assigment = a.id_as) AS 'points', 
            (SELECT ra.id_ra FROM ratings ra WHERE ra.assigment = a.id_as) AS 'rating_id',
            (SELECT ra.description FROM ratings ra WHERE ra.assigment = a.id_as) AS 'rating_description'
        FROM stu_ru sr
        JOIN runs r ON r.id_sute = sr.run
        JOIN assigments a ON a.subject = r.subject
        JOIN users u ON u.id_us = sr.student
        WHERE a.id_as = ${data.assigment} AND sr.run = ${data.run}
        GROUP BY sr.student`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async GetStudentsRuns(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT r.id_sute AS 'run_id', s.name AS 'subject_name', s.id_su AS 'subject_id', r.finished AS 'run_finished'
        FROM stu_ru sr
        JOIN runs r ON r.id_sute = sr.run
        JOIN subjects s ON s.id_su = r.subject
        WHERE sr.student = ${data.id}`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async GetTeachersRuns(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT r.id_sute AS 'run_id', s.name AS 'subject_name', s.id_su AS 'subject_id', r.finished AS 'run_finished'
        FROM runs r 
        JOIN subjects s ON s.id_su = r.subject
        WHERE r.teacher = ${data.id}`;
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