const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided')   //user doesn't have the required credentials

    try {
        const decoded = jwt.verify(token, config.get('jwt'));
        req.user = decoded;
        next();
    }
    catch(ex) {
        res.status(400).send('Invalid token');
    }

}

module.exports = auth;