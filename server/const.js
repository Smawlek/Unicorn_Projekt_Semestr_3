const jwt = require('jsonwebtoken');

module.exports = Object.freeze({
    DB_HOST: 'eu-cdbr-west-03.cleardb.net',
    DB_USER: 'b355d0361f6e63',
    DB_PWD: '85d0b69a',
    DB_NAME: 'heroku_0303a822ac6b00e',
    authenticateToken,
    _connectDBSync
});

function authenticateToken(req, res, next) {
    const token = req.query.token ? req.query.token : req.body.token;

    if(token === null) {
        res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.sendStatus(403);
        }

        req.query.token ? req.query.user = user[0] : req.body.user = user[0];
        
        next();
    })
}

async function _connectDBSync() {
    let connectionSync = mysql.createPool(
        {
            host: constants.DB_HOST,
            user: constants.DB_USER,
            password: constants.DB_PWD,
            database: constants.DB_NAME
        }
    )

    return connectionSync;
}

//mysql://b355d0361f6e63:85d0b69a@eu-cdbr-west-03.cleardb.net/heroku_0303a822ac6b00e?reconnect=true