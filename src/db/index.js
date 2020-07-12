const Sequelize = require('sequelize');
// const dbURL = require('../config').dbURL;

const config = require('../config').postgre;
const configMaster = require('../config').postgreMaster;
const db = {};

if(config.dialect === "postgres"){
  require('pg').defaults.parseInt8 = true;
}

// const sequelize = new Sequelize(dbURL);
let sequelize = new Sequelize(null, null, null, {
  dialect: config.dialect,
  replication: {
    read: config,
    write: configMaster
  },
  logging: false,
  pool: config.pool,
});

let users = sequelize.import('users', require('../users/model'));
db[users.name] = users;

let school = sequelize.import('school', require('../school/model'));
db[school.name] = school;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
