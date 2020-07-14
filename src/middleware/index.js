const jwt = require('express-jwt');
const config = require('../config');

function errorHandler(err, req, res, _next) {
    console.error(err.stack)
    if (typeof (err) === 'string') {
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        return res
            .status(401)
            .json({ message: 'Invalid token or token missing' })
    }
    return res
        .status(500)
        .json({ message: 'Something broke!' })
}

function authorize(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        jwt({ secret: config.jwt.secret, algorithms: config.jwt.algorithms }),

        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            next();
        }
    ];
}

module.exports = {
    errorHandler,
    authorize,
};