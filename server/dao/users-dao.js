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

    async LoginUser(user) {
        connection = await constants._connectDBSync();

        let pass = crypto.createHash('md5').update(user.password).digest("hex");
        //let sql = ``;
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