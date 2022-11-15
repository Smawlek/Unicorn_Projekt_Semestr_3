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
class TypesDao {

    async ListTypes() {
        connection = await this._connectDBSync();

        let sql = `SELECT * FROM types`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async CreateType(data) {
        connection = await this._connectDBSync();

        let sql = `INSERT INTO types(id_ty, name) VALUES(NULL, '${data.name}')`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async DeleteType(data) {
        connection = await this._connectDBSync();

        let sql = `DELETE FROM types WHERE id_ty = ${data.id}`;
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

module.exports = TypesDao;