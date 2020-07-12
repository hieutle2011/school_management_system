const jwt = require('jsonwebtoken');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const config = require('../config');
const userModel = require('../db').user;
const schoolModel = require('../db').school;
const classModel = require('../db').classroom;

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

async function getUser(req, res, next) {
    try {
        const { id } = req.params;
        const user = await userModel.findOne({
            where: { id },
            include: [
                { model: schoolModel },
                { model: classModel, }
            ],
        });
        // TODO: NOT FOUND
        res.send(user);
    } catch (error) {
        next(error);
    }
}

async function getSchool(req, res, next) {
    try {
        const { id, schoolId } = req.params;
        const user = await userModel.findAll({
            where: { id },
            include: [
                {
                    model: schoolModel,
                    required: true,
                    as: "schools",
                    where: { id: { [Op.in]: [schoolId] } },
                    include: [
                        {
                            model: classModel,
                            required: true,
                        }
                    ],
                }
            ],
        });
        // TODO: NOT FOUND
        res.send(user);
    } catch (error) {
        next(error);
    }
}

async function getClass(req, res, next) {
    try {
        const { id } = req.params;
        const user = await userModel.findOne({
            where: { id },
            include: [
                {
                    model: classModel,
                    required: true,
                    // where: { id: { [Op.in]: [classId] } }
                }
            ],
        });
        // TODO: NOT FOUND
        res.send(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    authenticate,
    getAll,
    login,
    getUser,
    getSchool,
    getClass,
}