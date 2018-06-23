'use strict';

module.exports = (sequelize, DataTypes) => {
  var RECREATION_GOOGLE_HOURS = sequelize.define('RECREATION_GOOGLE_HOURS', {
    periodID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    recreationID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startDay: { type: DataTypes.INTEGER },
    startTime: { type: DataTypes.INTEGER },
    endDay: { type: DataTypes.INTEGER },
    endTime: { type: DataTypes.INTEGER }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  RECREATION_GOOGLE_HOURS.associate = function(models) {
    models.RECREATION_DAYS.belongsTo(models.RECREATION, {
        as: 'GoogleHours',
        targetKey: 'recreationID',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
  }

  return RECREATION_GOOGLE_HOURS;
};