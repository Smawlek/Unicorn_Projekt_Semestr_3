require('dotenv').config({ path: __dirname + '/./../../.env' });

const Ajv = require("ajv").default;
const TypesDao = require("../../dao/types-dao");

const dao = new TypesDao();

let schema = {
    "type": "object",
    "properties": {
        "name": { "type": "string" },
    },
    "required": ["name"]
};

const allowedRoles = [1];

async function CreateAbl(req, res) {
    try {
        const ajv = new Ajv();
        const body = req.query.name ? req.query : req.body;
        const valid = ajv.validate(schema, body);

        if(!allowedRoles.includes(req.token.role)) {
            res.status(403).send({ errorMessage: "Neplatné oprávnění", params: req.body });
            return;
        } 

        if (valid) {
            let resp = await dao.CreateType(body);

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

module.exports = CreateAbl;