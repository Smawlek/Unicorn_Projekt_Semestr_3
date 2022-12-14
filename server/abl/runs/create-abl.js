require('dotenv').config({ path: __dirname + '/./../../.env' });

const Ajv = require("ajv").default;
const RunsDao = require("../../dao/runs-dao");

const dao = new RunsDao();

let schema = {
    "type": "object",
    "properties": {
        "subject": { "type": "number" },
        "teacher": { "type": "number" },
        "start": { "type": "string" },
        "length": { "type": "number" },
        "canSign": { "type": "number" },
        "capacity": { "type": "number" },
    },
    "required": ["subject", "teacher", "start", "length", "canSign", "capacity"]
};

const allowedRoles = [1];

async function CreateAbl(req, res) {
    try {
        const ajv = new Ajv();
        const body = req.query.subject ? req.query : req.body;

        body.subject = Number(body.subject);
        body.teacher = Number(body.teacher);
        body.length = Number(body.length);
        body.canSign = Number(body.canSign);
        body.capacity = Number(body.capacity);

        const valid = ajv.validate(schema, body);

        if(!allowedRoles.includes(req.token.role)) {
            res.status(403).send({ errorMessage: "Neplatné oprávnění", params: req.body });
            return;
        } 

        if (valid) {
            let resp = await dao.CreateRun(body);

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