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

    async ListFields() {
        connection = await this._connectDBSync();

        let sql = `SELECT * FROM fields`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async CreateField(data) {
        connection = await this._connectDBSync();

        let sql = `INSERT INTO fields(id_ty, name, short) VALUES(NULL, '${data.name}', '${data.short}')`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async UpdateField(data) {
        connection = await this._connectDBSync();

        let sql = `UPDATE fields
            SET name = '${data.name}', short = '${data.short}'
            WHERE id_fi = ${data.id}`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async GetField(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT * FROm fields WHERE id_fi = ${data.id}`;
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