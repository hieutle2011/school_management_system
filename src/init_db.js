const userModel = require('./db').user;

const { role } = require('./helper')

async function initDB() {
    console.log('Initialize data')
    await userModel.truncate();
    await userModel.bulkCreate([
        { username: 'Alice', password: 'pw', role: role.Teacher },
        { username: 'Bob', password: 'pw', role: role.Owner },
        { username: 'David', password: 'pw', role: role.Admin },
    ])
}

module.exports = initDB;