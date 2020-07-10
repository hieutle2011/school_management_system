const jwt = require('jsonwebtoken');
const { User } = require('./index')
const config = require('../config')

async function authenticate({ username, password }) {
    try {
        const users = await User.findAll()
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret);
            const { password, ...userWithoutPassword } = user;
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
        const data = await authenticate(req.body)
        data ? res.send(data) : res.status(400).json({ message: 'Username or password is incorrect' })
    } catch (error) {
        next(error)
    }

}

async function getAll(req, res) {
    try {
        const users = await User.findAll()
        res.send(users);
    } catch (error) {
        next(error)
    }

}

module.exports = {
    authenticate,
    getAll,
    login,
}