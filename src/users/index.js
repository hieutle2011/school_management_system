const { role } = require('../helper')

const users = [
    { id: 1, username: 'Alice', password: 'pw', role: role.Teacher },
    { id: 2, username: 'Bob', password: 'pw', role: role.Owner },
    { id: 2, username: 'David', password: 'pw', role: role.Admin },
]

const User = {
    findAll: () => Promise.resolve(users)
}

module.exports = { User }