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

    async ListRatings() {
        connection = await this._connectDBSync();

        let sql = `SELECT * FROM ratings`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async CreateRating(data) {
        connection = await this._connectDBSync();

        let sql = `INSERT INTO ratings(id_ra, assigment, sturu_id, points, description) 
            VALUES(NULL, ${data.assigment}, ${data.sturu_id}, ${data.points}, '${data.description}')`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async UpdateRating(data) {
        connection = await this._connectDBSync();

        let sql = `UPDATE ratings 
            SET assigment = ${data.assigment}, points = ${data.points}, description = '${data.description}'`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async DeleteRating(data) {
        connection = await this._connectDBSync();

        let sql = `DELETE FROM ratings WHERE id_ra = ${data.id}`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async GetRating(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT * FROM ratings WHERE id_ra = ${data.id}`;
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