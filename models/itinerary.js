'use strict';

module.exports = (sequelize, DataTypes) => {
  var ITINERARY = sequelize.define('ITINERARY', {
    itineraryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
    zipcode: { type: DataTypes.STRING }
  }, {
    freezeTableName: true
  });

  ITINERARY.associate = function (models) {
    models.ITINERARY.belongsToMany(models.RECREATION, {
      as: 'RecreationList',
      through: 'ITINERARY_RECREATION_DL',
      foreignKey: 'itineraryID',
      otherKey: 'recreationID',
      onUpdate: "CASCADE"
    });
  };

  return ITINERARY;
};