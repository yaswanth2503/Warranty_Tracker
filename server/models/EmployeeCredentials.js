const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('EmployeeCredentials', {
 
  Employee_Id: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    primaryKey: true,
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
}, {
  tableName: 'Employee_Credentials',
  timestamps:true,
  paranoid:true,
  hooks:{
    beforeCreate: async(employee)=>{
      employee.Password = await bcrypt.hash(employee.Password,10)
    },
    beforeUpdate: async(employee)=>{
      if(employee.changed('Password')){
      employee.Password = await bcrypt.hash(employee.Password,10)
      }
    }
  }
 
});

module.exports = Employee;


