const userModel = require('./db').user;
const schoolModel = require('./db').school;

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

async function initDB() {
    console.log('Initialize data')

    await userModel.bulkCreate(user_data)
    await schoolModel.bulkCreate(school_data)
}

module.exports = initDB;