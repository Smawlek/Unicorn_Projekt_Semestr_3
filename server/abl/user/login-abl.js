require('dotenv').config({ path: __dirname + '/./../../.env' });

const Ajv = require("ajv").default;
const UsersDao = require("../../dao/users-dao");

const jwt = require('jsonwebtoken');

let dao = new UsersDao();

let schema = {
    "type": "object",
    "properties": {
        "email": { "type": "string" },
        "password": { "type": "string" },
    },
    "required": ["email", "password"]
};

async function LoginAbl(req, res) {
    try {
        const ajv = new Ajv();
        const body = req.query.email ? req.query : req.body;
        const valid = ajv.validate(schema, body);

        if (valid) {
            let user = await dao.LoginUser(body);

            if (!user) {
                res.status(402).send({
                    errorMessage: "Chybný dotaz na server",
                    params: req.body,
                    reason: ajv.errors
                });
                return;
            }

            if (user.length > 2) {
                let s = user;
                user = JSON.parse(user)
                user[0].token = jwt.sign(s, process.env.ACCESS_TOKEN_SECRET);
                user = JSON.stringify(user);
                
                res.status(200).send(user);
                return;
            }

            res.status(405).send({
                errorMessage: "Uživatel s tímto emailem neexistuje nebo bylo chybně zadáno heslo",
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
        //res.status(500).send(e)
        return;
    }
}

module.exports = LoginAbl;