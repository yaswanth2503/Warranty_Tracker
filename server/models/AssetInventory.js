const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./EmployeeCredentials'); 

const Asset = sequelize.define('AssetInventory', {
  Asset_Id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Employee_Id: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  Serial_Number: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Category: {
    type: DataTypes.TEXT('medium'),
    allowNull: false,
  },
  Brand: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  Model: {
    type: DataTypes.TEXT('medium'),
    allowNull: false,
  },
  Purchased_From: {
    type: DataTypes.TEXT('tiny'),
    allowNull: false,
  },
  Purchased_Date: {
    type: DataTypes.DATE,
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
  Warranty_Extendable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Asset_Price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  Asset_Images: {
    type: DataTypes.ARRAY(DataTypes.BLOB('long')),
    allowNull: false,
  },
}, 
{
  tableName: 'Asset_Inventory',
  timestamps: true,
  paranoid:true,
  indexes:[
    { 
      unique: true,
      fields:['Asset_Id']
    }
  ],
  validate:{
  checkWarrantyDates(){
    if(this.Warranty_Start_Date < this.Purchased_Date){
      throw new Error('Warranty Start Date must be on or after the Purchased Date.')
    }
    if(this.Warranty_End_Date <= this.Warranty_Start_Date){
      throw new Error('Warranty End Date must be after the Warranty Start Date.')
    }
    
  },
  checkPrice(){
    if(this.Asset_Price<=0){
      throw new Error('Asset Price must be greater than 0.')
    }
  }
}
});


Asset.belongsTo(Employee, { 
  foreignKey: 'Employee_Id',
  onUpdate:'CASCADE'
});

module.exports = Asset;
