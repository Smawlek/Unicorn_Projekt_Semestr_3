require('dotenv').config({ path: __dirname + '/./../../.env' });

const Ajv = require("ajv").default;
const UsersDao = require("../../dao/users-dao");

const jwt = require('jsonwebtoken');

let dao = new UsersDao();

let schema = {
    "type": "object",
    "properties": {
        "role": { "type": "number" },
    },
    "required": []
};

const allowedRoles = [1, 2, 3];

async function ListAbl(req, res) {
    try {
        const ajv = new Ajv();
        const body = req.query.role ? req.query : req.body;
        body.role = Number(body.role);
        const valid = ajv.validate(schema, body);

        if (valid) {
            let user = await dao.ListUsers(body);

            res.status(200).send(user);
            return;
        } else {
            res.status(401).send({
                errorMessage: "Ověření údajů se nezdařilo. Chybné údaje",
                params: body,
                reason: ajv.errors
            })
            return;
        }
    } catch (e) {
        /*
        if (e.message.includes(" ")) {
            res.status(400).send({ errorMessage: "Neočekávaná chyba. " + e.message, params: req.body })
        } */
        //res.status(500).send(e)
        return;
    }
}

module.exports = ListAbl;