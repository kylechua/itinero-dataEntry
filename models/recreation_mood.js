'use strict';

module.exports = (sequelize, DataTypes) => {
  var RECREATION_MOOD = sequelize.define('RECREATION_MOOD', {
    recreationID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
    mood: { 
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true 
      },
    rank: { type: DataTypes.INTEGER }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  RECREATION_MOOD.associate = function(models) {
    models.RECREATION_MOOD.belongsTo(models.RECREATION, {
        as: 'Moods',
        targetKey: 'recreationID',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
  }

  return RECREATION_MOOD;
};