'use strict';

module.exports = (sequelize, DataTypes) => {
  var RECREATION_DAYS = sequelize.define('RECREATION_DAYS', {
    recreationID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    sunday: { type: DataTypes.BOOLEAN, allowNull: true },
    monday: { type: DataTypes.BOOLEAN, allowNull: true },
    tuesday: { type: DataTypes.BOOLEAN, allowNull: true },
    wednesday: { type: DataTypes.BOOLEAN, allowNull: true },
    thursday: { type: DataTypes.BOOLEAN, allowNull: true },
    friday: { type: DataTypes.BOOLEAN, allowNull: true },
    saturday: { type: DataTypes.BOOLEAN, allowNull: true },
  }, {
    timestamps: false,
    freezeTableName: true
  });

  RECREATION_DAYS.associate = function(models) {
    models.RECREATION_DAYS.belongsTo(models.RECREATION, {
        as: 'Recreation',
        targetKey: 'recreationID',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
  }

  return RECREATION_DAYS;
};