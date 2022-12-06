require('dotenv').config({ path: __dirname + '/./../../.env' });

const Ajv = require("ajv").default;
const UsersDao = require("../../dao/users-dao");

const jwt = require('jsonwebtoken');

let dao = new UsersDao();

let schema = {
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "id": { "type": "number" },
        "email": { "type": "string" },
        "password": { "type": "string" },
    },
    "required": ["name", "id", "email", "password"]
};

const allowedRoles = [1, 2, 3];

async function UpdateAbl(req, res) {
    try {
        const ajv = new Ajv();
        const body = req.query.name ? req.query : req.body;
        const valid = ajv.validate(schema, body);

        if(!allowedRoles.includes(req.token.role)) {
            res.status(403).send({ errorMessage: "Neplatné oprávnění", params: req.body });
            return;
        } 

        if (valid) {
            let user = await dao.UpdateUser(body);

            if (!user) {
                res.status(402).send({
                    errorMessage: "Chybný dotaz na server",
                    params: req.body,
                    reason: ajv.errors
                });
                return;
            }

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

module.exports = UpdateAbl;