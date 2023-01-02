require('dotenv').config({ path: __dirname + '/./../../.env' });

const Ajv = require("ajv").default;
const SubjectsDao = require("../../dao/subjects-dao");

const dao = new SubjectsDao();

let schema = {
    "type": "object",
    "properties": {
        "run": { "type": "number" },
        "student": { "type": "number" },
    },
    "required": ["run", "student"]
};

const allowedRoles = [1, 2, 3];

async function IsUserSignedAbl(req, res) {
    try {
        const ajv = new Ajv();
        const body = req.query.run ? req.query : req.body;
        
        body.run = Number(body.run);
        body.student = Number(body.student);

        const valid = ajv.validate(schema, body);

        if (!allowedRoles.includes(req.token.role)) {
            res.status(403).send({ errorMessage: "Neplatné oprávnění", params: req.body });
            return;
        }

        if (valid) {
            let resp = await dao.IsUserSigned(body);

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

module.exports = IsUserSignedAbl;