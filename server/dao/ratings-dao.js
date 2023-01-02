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

    async GetRatingForStudent(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT * FROM ratings WHERE assigment = ${data.assigment} AND sturu_id = ${data.id}`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async AlterRatings(data) {
        for(let i = 0; i < data.length; i++) {
            if(data.rating_id === "" || data.rating_id === undefined || data.rating_id <= 0) {
                // Vytvořit nový rating
                await this.CreateRating({
                    assigment: data[i].assigment_id ,
                    sturu_id: data[i].sturu_id,
                    points: data[i].points,
                    description: "",
                })
            } else {
                // Upravit existující rating
                await this.UpdateRating({
                    assigment: data[i].assigment_id,
                    id: data[i].rating_id,
                    points: data[i].points,
                    description: data[i].rating_description,
                })
            }
        }
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