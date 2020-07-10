const jwt = require('jsonwebtoken');
const { User } = require('./index')
const config = require('../config')

async function authenticate({ username, password }) {
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
}

async function login(req, res, next) {
    console.log(req.body)
    const data = await authenticate(req.body)
    data ? res.send(data) : res.status(400).json({ message: 'Username or password is incorrect' })
}

async function getAll(req, res) {
    const users = await User.findAll()
    res.send(users);
}

module.exports = {
    authenticate,
    getAll,
    login,
}