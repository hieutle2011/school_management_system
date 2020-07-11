const jwt = require('jsonwebtoken');
const config = require('../config');
const userModel = require('../db').user;

async function authenticate({ username, password }) {
    try {
        const user = await userModel.findOne({ where: { username, password } });
        if (user) {
            const data = user.dataValues;
            const token = 'Bearer ' + jwt.sign({ id: data.id, role: data.role }, config.jwt.secret);
            const { password, ...userWithoutPassword } = data;
            return {
                ...userWithoutPassword,
                token
            };
        }

        return null
    } catch (error) {
        next(error)
    }
}

async function login(req, res, next) {
    try {
        const data = await authenticate(req.body);
        data ? res.send(data) : res.status(400).json({ message: 'Username or password is incorrect' });
    } catch (error) {
        next(error);
    }
}

async function getAll(req, res, next) {
    try {
        const users = await userModel.findAll();
        res.send(users);
    } catch (error) {
        next(error);
    }

}

module.exports = {
    authenticate,
    getAll,
    login,
}