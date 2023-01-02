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
class FieldsDao {

    async ListAssigments() {
        connection = await this._connectDBSync();

        let sql = `SELECT a.*, s.name AS 'subject_name', t.name AS 'type_name' 
        FROM assigments a
        JOIN subjects s ON s.id_su = a.subject
        JOIN types t ON t.id_ty = a.type`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async CreateAssigment(data) {
        connection = await this._connectDBSync();

        let sql = `INSERT INTO assigments(id_as, author, subject, type, name, description, maxPoints)
            VALUES(NULL, ${data.author}, ${data.subject}, ${data.type}, '${data.name}', '${data.description}', 
            ${data.maxPoints})`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async UpdateAssigment(data) {
        connection = await this._connectDBSync();

        let sql = `UPDATE assigments
            SET subject = ${data.subject}, type = ${data.type}, name = '${data.name}', 
            description = '${data.description}', maxPoints = ${data.maxPoints}
            WHERE id_as = ${data.id}`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async GetAssigment(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT a.*, s.name AS 'subject_name', t.name AS 'type_name'
        FROM assigments a 
        JOIN subjects s ON s.id_su = a.subject
        JOIN types t ON t.id_ty = a.type
        WHERE a.id_as = ${data.id}`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async GetAssigmentBySubject(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT a.*, s.name AS 'subject_name', t.name AS 'type_name'
        FROM assigments a 
        JOIN subjects s ON s.id_su = a.subject
        JOIN types t ON t.id_ty = a.type
        WHERE a.subject = ${data.id}`;
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

module.exports = FieldsDao;