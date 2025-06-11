require('dotenv').config();

const {Sequelize} = require('sequelize');

module.exports = ()=>{
    return new Sequelize(
        'warranty_tracker',
        'postgres', 
        'root',
        {
            host: 'localhost',
            port: 5432,
            dialect: 'postgres',
            logging: false
        }
    )
}