'use strict';

module.exports = (sequelize, DataTypes) => {
  var RECREATION = sequelize.define('RECREATION', {
    recreationID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
    venueID: { type: DataTypes.INTEGER, allowNull: false },
    recreationName: { type: DataTypes.STRING, allowNull: false },
    minDuration: { type: DataTypes.INTEGER, allowNull: false },
    maxDuration: { type: DataTypes.INTEGER, allowNull: false },
    minCost: { type: DataTypes.INTEGER, allowNull: false },
    maxCost: { type: DataTypes.INTEGER, allowNull: false },
    recreationLast: { type: DataTypes.BOOLEAN, allowNull: false },
    timestart: { type: DataTypes.INTEGER },
    timefinish: { type: DataTypes.INTEGER },
    minParticipant: { type: DataTypes.INTEGER, allowNull: false },
    maxParticipant: { type: DataTypes.INTEGER, allowNull: false },
    weatherValidity: { type: DataTypes.INTEGER, allowNull: false },
    winterValidity: { type: DataTypes.BOOLEAN },
    springValidity: { type: DataTypes.BOOLEAN },
    summerValidity: { type: DataTypes.BOOLEAN },
    fallValidity: { type: DataTypes.BOOLEAN },
    reservationRequired: { type: DataTypes.BOOLEAN, allowNull: false },
    activityLevel: { type: DataTypes.INTEGER, allowNull: false },
    shortformDescription: { type: DataTypes.STRING, allowNull: false },
    "21andUp": { type: DataTypes.BOOLEAN, allowNull: false },
    fullDescription: { type: DataTypes.STRING },
    photoURL: { type: DataTypes.STRING}
  }, {
    timestamps: false,
    freezeTableName: true
  });

  RECREATION.associate = function (models) {
    models.RECREATION.belongsTo(models.VENUE, {
        as: 'Venue',
        foreignKey: 'venueID',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });
  };

  return RECREATION;
};