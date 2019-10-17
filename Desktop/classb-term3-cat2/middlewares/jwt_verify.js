const config = require('config');
const jwt = require('jsonwebtoken');

function tokenVerify(req, res, next){
    const token = req.header('auth-token')
    if(!token) return res.send('No Token Found').status(401);
    try{
        const decoded = jwt.verify(token, config.get('privateKey'));
        req.user = decoded
        next()
    }
    catch(err){
        return res.send('Invalid token').status(400)
    }
}

module.exports = tokenVerify;