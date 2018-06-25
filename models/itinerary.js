'use strict';

module.exports = (sequelize, DataTypes) => {
  var itinerary = sequelize.define('itinerary', {
    itineraryid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
    zipcode: { type: DataTypes.STRING }
  }, {
    freezeTableName: true
  });

  itinerary.associate = function (models) {
    models.itinerary.belongsToMany(models.recreation, {
      as: 'RecreationList',
      through: 'itinerary_recreation_dl',
      foreignKey: 'itineraryid',
      otherKey: 'recreationid',
      onUpdate: "CASCADE"
    });
  };

  return itinerary;
};