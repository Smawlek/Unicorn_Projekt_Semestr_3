require('dotenv').config({ path: __dirname + '/./../../.env' });

const Ajv = require("ajv").default;
const AssigmentsDao = require("../../dao/assigments-dao");

const dao = new AssigmentsDao();

let schema = {
    "type": "object",
    "properties": {
        "id": { "type": "number" },
        "subject": { "type": "number" },
        "type": { "type": "number" },
        "name": { "type": "string" },
        "description": { "type": "string" },
        "maxPoints": { "type": "number" },
    },
    "required": ["id", "subject", "type", "name", "description", "maxPoints"]
};

const allowedRoles = [1];

async function UpdateAbl(req, res) {
    try {
        const ajv = new Ajv();
        const body = req.query.id ? req.query : req.body;
        const valid = ajv.validate(schema, body);

        if(!allowedRoles.includes(req.token.role)) {
            res.status(403).send({ errorMessage: "Neplatné oprávnění", params: req.body });
            return;
        } 

        if (valid) {
            let resp = await dao.UpdateAssigment(body);

            if (!resp) {
                res.status(402).send({
                    errorMessage: "Chybný dotaz na server",
                    params: req.body,
                    reason: ajv.errors
                })
            }

            if (resp.length > 2) {  
                res.status(200).send(resp);
            }

            res.status(405).send({
                errorMessage: "Neplatný dotaz na server",
                params: req.body,
                reason: ajv.errors
            })
        } else {
            res.status(401).send({
                errorMessage: "Ověření údajů se nezdařilo. Chybné údaje",
                params: body,
                reason: ajv.errors
            })
        }
    } catch (e) {
        /*
        if (e.message.includes(" ")) {
            res.status(400).send({ errorMessage: "Neočekávaná chyba. " + e.message, params: req.body })
        } */
        //res.status(500).send(e)
    }
}

module.exports = UpdateAbl;