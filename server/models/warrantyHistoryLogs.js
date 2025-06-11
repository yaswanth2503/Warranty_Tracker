const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const warranty_history_logs= sequelize.define('WarrantyHistoryLogs', {
    History_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Extension_Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Asset_Id: {
      type: DataTypes.STRING,
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
  }, {
    tableName: 'Warranty_History_Logs',
    timestamps: true,
  });

 warranty_history_logs.associate = (models) => {
    warranty_history_logs.belongsTo(models.warrantyExtensions, { 
      foreignKey: 'Extension_Id', 
      onUpdate: 'CASCADE' 
    });
  };

  return warranty_history_logs;
};
