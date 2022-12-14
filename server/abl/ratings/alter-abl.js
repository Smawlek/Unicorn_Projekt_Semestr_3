require('dotenv').config({ path: __dirname + '/./../../.env' });

const Ajv = require("ajv").default;
const RatingsDao = require("../../dao/ratings-dao");

const dao = new RatingsDao();

let schema = {
    "type": "object",
    "properties": {
    },
    "required": ["data"]
};

const allowedRoles = [1, 2];

async function AlterAbl(req, res) {
    try {
        const ajv = new Ajv();
        const body = req.query.data ? req.query : req.body;
        //const valid = ajv.validate(schema, body);

        if (!allowedRoles.includes(req.token.role)) {
            res.status(403).send({ errorMessage: "Neplatné oprávnění", params: req.body });
            return;
        }

        if (body.data.length > 0 /*valid*/) {
            let resp = await dao.AlterRatings(body);

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

module.exports = AlterAbl;