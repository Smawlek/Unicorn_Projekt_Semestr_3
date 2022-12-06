require('dotenv').config({ path: __dirname + '/./../../.env' });

const Ajv = require("ajv").default;
const FieldsDao = require("../../dao/fields-dao");

const dao = new FieldsDao();

let schema = {
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "short": { "type": "string" },
        "id": { "type": "number" },
    },
    "required": ["name", "short", "id"]
};

const allowedRoles = [1];

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
            let resp = await dao.UpdateField(body);

            if (!resp) {
                res.status(402).send({
                    errorMessage: "Chybný dotaz na server",
                    params: req.body,
                    reason: ajv.errors
                });
                return;
            }

            if (resp.length > 2) {  
                res.status(200).send(resp);
                return;
            }

            res.status(405).send({
                errorMessage: "Neplatný dotaz na server",
                params: req.body,
                reason: ajv.errors
            });
            return;
        } else {
            res.status(401).send({
                errorMessage: "Ověření údajů se nezdařilo. Chybné údaje",
                params: body,
                reason: ajv.errors
            });
            return;
        }
    } catch (e) {
        /*
        if (e.message.includes(" ")) {
            res.status(400).send({ errorMessage: "Neočekávaná chyba. " + e.message, params: req.body })
        } */
        //res.status(500).send(e);
        return;
    }
}

module.exports = UpdateAbl;