require('dotenv').config({ path: __dirname + '/./../../.env' });

const Ajv = require("ajv").default;
const RolesDao = require("../../dao/roles-dao");

const dao = new RolesDao();

let schema = {
    "type": "object",
    "properties": {
    },
    "required": []
};

const allowedRoles = [1, 2, 3];

async function ListAbl(req, res) {
    try {
        const ajv = new Ajv();
        //const body = req.query.creator ? req.query : req.body;
        //const valid = ajv.validate(schema, body);

        if(!allowedRoles.includes(req.token.role)) {
            res.status(403).send({ errorMessage: "Neplatné oprávnění", params: req.body });
            return;
        } 

        if (true) {
            let resp = await dao.ListRoles();

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

module.exports = ListAbl;