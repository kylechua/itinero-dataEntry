'use strict';

module.exports = (sequelize, DataTypes) => {
  var recreation_days = sequelize.define('recreation_days', {
    recreationid: {
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

  recreation_days.associate = function(models) {
    models.recreation_days.belongsTo(models.recreation, {
        as: 'Recreation',
        targetKey: 'recreationid',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
  }

  return recreation_days;
};