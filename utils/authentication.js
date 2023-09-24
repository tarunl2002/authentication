const jwt = require('jsonwebtoken');
const authorization = require('./authorization');

const authentication = (req, res, next) => {
    const token = req.cookies.auth;
    if (token) {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
                username: data.username,
                role: data.role
            };
            authorization(req.user.role, req.user);
        } catch (next) {
            next(err);
        }
    }
    next();
}

module.exports = authentication;