const jwt = require('jsonwebtoken');
const config = require('../config');
const userModel = require('../db').user;
const schoolModel = require('../db').school;
const classModel = require('../db').classroom;
const trackingModel = require('../db').tracking;

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

async function getTeacherClass(req, res, next) {
    try {
        const { id, classId } = req.params;
        const user = await userModel.findOne({
            where: { id },
            include: [
                {
                    model: classModel,
                    where: classId? { id: classId } : null,
                    include: [
                        { model: trackingModel, }
                    ]
                }
            ],
        });
        // TODO: NOT FOUND
        res.send(user);
    } catch (error) {
        next(error);
    }
}

async function getOwnerSchoolClass(req, res, next) {
    try {
        const { id, schoolId, classId } = req.params;
        const user = await userModel.findOne({
            where: { id },
            include: [
                {
                    model: schoolModel,
                    where: { id: schoolId },
                    include: [
                        {
                            model: classModel,
                            where: { id: classId },
                            include: [
                                {
                                    model: trackingModel,
                                }
                            ],
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

async function getOwnerSchools(req, res, next) {
    try {
        const { id, schoolId } = req.params;
        const user = await userModel.findOne({
            where: { id },
            include: [
                {
                    model: schoolModel,
                    where: schoolId ? { id: schoolId } : null,
                    include: [
                        {
                            model: classModel,
                            include: [
                                {
                                    model: trackingModel,
                                }
                            ],
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

module.exports = {
    authenticate,
    getAll,
    login,
    getUser,
    getTeacherClass,
    getOwnerSchoolClass,
    getOwnerSchools,
}