require('dotenv').config({ path: __dirname + '/./../../.env' });

const Ajv = require("ajv").default;
const SubjectsDao = require("../../dao/subjects-dao");

const dao = new SubjectsDao();

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

        if (true) {
            let resp = await dao.ListSubjects();

            if (!resp) {
                res.status(402).send({
                    errorMessage: "Chybný dotaz na server",
                    params: req.body,
                    reason: ajv.errors
                });
                return;
            }

            res.status(200).send(resp);
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