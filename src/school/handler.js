const schoolModel = require('../db').school;

async function getAll(req, res, next) {
    try {
        const schools = await schoolModel.findAll();
        res.send(schools);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAll,
}