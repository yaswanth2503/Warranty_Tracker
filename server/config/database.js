const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('warranty_tracker', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
