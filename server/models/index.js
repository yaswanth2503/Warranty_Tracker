const sequelize = require('../config/database')();


const defineEmployee = require('./employeeCredentials');
const defineAsset = require('./assetInventory');
const defineWarrantyExtension = require('./warrantyExtensions');
const defineWarrantyHistory = require('./warrantyHistoryLogs');


const Employee = defineEmployee(sequelize);
const Asset = defineAsset(sequelize);
const warranty_extension = defineWarrantyExtension(sequelize);
const warranty_history_logs = defineWarrantyHistory(sequelize);

// Define associations
Asset.belongsTo(Employee, { foreignKey: 'Employee_Id', onUpdate: 'CASCADE' });
warranty_extension.belongsTo(Asset, { foreignKey: 'Asset_Id', onUpdate: 'CASCADE' });
warranty_history_logs.belongsTo(warranty_extension, { foreignKey: 'Extension_Id', onUpdate: 'CASCADE' });

module.exports = {
  sequelize,
  Employee,
  Asset,
  warranty_extension,
  warranty_history_logs
};
