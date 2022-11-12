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
class UsersDao {

    async LoginUser(data) {
        connection = await this._connectDBSync();

        let pass = crypto.createHash('md5').update(data.password).digest("hex");

        let sql = `SELECT id_us AS 'id', name, role, email FROM users WHERE email = '${data.email}' AND password = '${pass}'`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async CreateUser(data) {
        connection = await this._connectDBSync();

        let role = data.role === undefined || data.role === null ? 3 : data.role;
        let pass = crypto.createHash('md5').update(data.password).digest("hex");

        let sql = `INSERT INTO users(id_us, name, role, password, email) VALUES(NULL, '${data.name}', ${role}, '${pass}', '${data.email}')`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async ListUsers() {
        connection = await this._connectDBSync();

        let sql = `SELECT id_us AS 'id', name, role, email FROM users`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async GetUserById(data) {
        connection = await this._connectDBSync();

        let sql = `SELECT id_us AS 'id', name, role, email FROM users WHERE id_us = ${data.id}`;
        let [res] = await connection.query(sql);

        connection.end();

        return JSON.stringify(res);
    }

    async UpdateUser(data) {
        console.log("hi")
        connection = await this._connectDBSync();

        let pass = crypto.createHash('md5').update(data.password).digest("hex");
console.log(pass)
        let sql = `UPDATE users SET name = '${data.name}', password = '${pass}', email = '${data.email}' WHERE id_us = ${data.id}`;
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

module.exports = UsersDao;