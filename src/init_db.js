const userModel = require('./db').user;
const schoolModel = require('./db').school;
const classModel = require('./db').classroom;

const { role, status } = require('./helper');

const user_data = [
    { username: 'Alice', password: 'pw', role: role.Teacher },
    { username: 'Bob', password: 'pw', role: role.Owner },
    { username: 'David', password: 'pw', role: role.Admin },
];

const school_data = [
    { name: 'CFVG', paymentType: status.Free, ownerId: 2 },
    { name: 'NEU', paymentType: status.Paid, ownerId: 2 },
];

const class_data = [
    { name: 'A1', year: 2020, teacherId: 1, schoolId: 1},
    { name: 'A2', year: 2020, teacherId: 1, schoolId: 2},
]

async function initDB() {
    console.log('Initialize data')

    await userModel.bulkCreate(user_data)
    await schoolModel.bulkCreate(school_data)
    await classModel.bulkCreate(class_data)
}

module.exports = initDB;