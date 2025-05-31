const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Warranty_Extension = require('./WarrantyExtensions');

const WarrantyHistory = sequelize.define('WarrantyHistoryLogs', {
  History_Id:{
    type: DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true
  },  
  Extension_Id:{
    type: DataTypes.INTEGER,
    allowNull:false
  },
  Asset_Id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Serial_Number: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Warranty_Start_Date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  Warranty_End_Date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  Extended_Warranty_Date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
},
 {
  tableName: 'Warranty_History_Logs',
  timestamps: true,
});


WarrantyHistory.belongsTo(Warranty_Extension, {foreignKey: 'Extension_Id', onUpdate: 'CASCADE' });

module.exports = WarrantyHistory;
