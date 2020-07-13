const userModel = require('./db').user;
const schoolModel = require('./db').school;
const classModel = require('./db').classroom;
const childModel = require('./db').child;
const trackingModel = require('./db').tracking;

const { role, status } = require('./helper');

const user_data = [
    { username: 'Alice', password: 'pw', role: role.Teacher },
    { username: 'Bob', password: 'pw', role: role.Owner },
    { username: 'David', password: 'pw', role: role.Admin },
    { username: 'Charles', password: 'pw', role: role.HQ },
];

const school_data = [
    { name: 'CFVG', paymentType: status.Free, ownerId: 2 },
    { name: 'NEU', paymentType: status.Paid, ownerId: 2 },
];

const class_data = [
    { name: 'A1', year: 2020, teacherId: 1, schoolId: 1 },
    { name: 'A2', year: 2020, teacherId: 1, schoolId: 2 },
]

const child_data = [
    { name: 'Jr John' },
    { name: 'Jr Frank' },
    { name: 'Jr Walter' },
    { name: 'Jr Donald' },
]

const tracking_data = [
    { childId: 1, classroomId: 1 },
    { childId: 2, classroomId: 1 },
    { childId: 3, classroomId: 2 },
    { childId: 4, classroomId: 2 },
]

async function initDB() {
    console.log('Initialize data')

    await userModel.bulkCreate(user_data)
    await schoolModel.bulkCreate(school_data)
    await classModel.bulkCreate(class_data)
    await childModel.bulkCreate(child_data)
    await trackingModel.bulkCreate(tracking_data)
}

module.exports = initDB;