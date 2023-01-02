require('dotenv').config({ path: __dirname + '/./../../.env' });

const Ajv = require("ajv").default;
const RatingsDao = require("../../dao/ratings-dao");

const dao = new RatingsDao();

let schema = {
    "type": "object",
    "properties": {
        "id": { "type": "number" },
        "assigment": { "type": "number" },
    },
    "required": ["id", "assigment"]
};

const allowedRoles = [1, 2, 3];

async function GetForStudentAbl(req, res) {
    try {
        const ajv = new Ajv();
        const body = req.query.id ? req.query : req.body;

        body.id = Number(body.id);
        body.assigment = Number(body.assigment);

        const valid = ajv.validate(schema, body);

        if (!allowedRoles.includes(req.token.role)) {
            res.status(403).send({ errorMessage: "Neplatné oprávnění", params: req.body });
            return;
        }

        if (valid) {
            let resp = await dao.GetRatingForStudent(body);

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

module.exports = GetForStudentAbl;