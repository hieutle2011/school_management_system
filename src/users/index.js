const users = [
    { id: 1, name: 'Alice', password: 'pw', role: 'teacher' },
    { id: 2, name: 'Bob', password: 'pw', role: 'owner' },
]

const User = {
    findAll: () => Promise.resolve(users)
}

module.exports = { User }