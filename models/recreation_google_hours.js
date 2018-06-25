'use strict';

module.exports = (sequelize, DataTypes) => {
  var recreation_google_hours = sequelize.define('recreation_google_hours', {
    periodid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    recreationid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startday: { type: DataTypes.INTEGER },
    startdime: { type: DataTypes.INTEGER },
    endtay: { type: DataTypes.INTEGER },
    endtime: { type: DataTypes.INTEGER }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  recreation_google_hours.associate = function(models) {
    models.recreation_google_hours.belongsTo(models.recreation, {
        as: 'GoogleHours',
        targetKey: 'recreationid',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
  }

  return recreation_google_hours;
};