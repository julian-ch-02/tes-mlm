const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize(process.env.DATABASE,process.env.USERNAME,process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql'
});

db.sequelize = sequelize;
db.sequelize = sequelize;

module.exports = db;
