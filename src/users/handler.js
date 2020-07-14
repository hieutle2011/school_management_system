const jwt = require('jsonwebtoken');
const { csvExport } = require('../helper')
const config = require('../config');
const userModel = require('../db').user;
const schoolModel = require('../db').school;
const classModel = require('../db').classroom;
const trackingModel = require('../db').tracking;

async function authenticate({ username, password }) {
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

async function getUser(req, res, next) {
    try {
        const { id } = req.user;
        const user = await userModel.findOne({
            where: { id },
            include: [
                { model: schoolModel },
                { model: classModel, }
            ],
        });
        user ? res.send(user) : res.status(400).json({ message: 'Data not found' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    authenticate,
    getAll,
    login,
    getUser,
}