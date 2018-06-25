'use strict';

module.exports = (sequelize, DataTypes) => {
  var recreation_mood = sequelize.define('recreation_mood', {
    recreationid: {
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

  recreation_mood.associate = function(models) {
    models.recreation_mood.belongsTo(models.recreation, {
        as: 'Moods',
        targetKey: 'recreationid',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
  }

  return recreation_mood;
};