const sequelize = require('../config/database');
const Employee = require('./EmployeeCredentials');
const Asset = require('./AssetInventory');
const WarrantyExtension = require('./WarrantyExtensions');
const WarrantyHistory = require('./WarrantyHistoryLogs');

// Associations
Asset.belongsTo(Employee, { foreignKey: 'Employee_Id' });
WarrantyExtension.belongsTo(Asset, { foreignKey: 'Asset_Id' });
WarrantyHistory.belongsTo(WarrantyExtension, { foreignKey: 'Extension_Id' });

module.exports = {
  sequelize,
  Employee,
  Asset,
  WarrantyExtension,
  WarrantyHistory
};
