const jwt = require('jsonwebtoken');

module.exports = Object.freeze({
    DB_HOST: 'eu-cdbr-west-03.cleardb.net',
    DB_USER: 'b396ff6dd5563d',
    DB_PWD: '0f5bcb1c',
    DB_NAME: 'heroku_1ef9dff0b28c648',
    authenticateToken
});

function authenticateToken(req, res, next) {
    const token = req.headers.token;

    if(token === null) {
        res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.sendStatus(403);
        }

        req.token = user[0];
        
        next();
    })
}

//mysql://b396ff6dd5563d:0f5bcb1c@eu-cdbr-west-03.cleardb.net/heroku_1ef9dff0b28c648?reconnect=true