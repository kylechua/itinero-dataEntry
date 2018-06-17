'use strict';

module.exports = (sequelize, DataTypes) => {
  var VENUE = sequelize.define('VENUE', {
    venueID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
    venueName: { type: DataTypes.STRING, allowNull: false },
    googlePlaceID: { type: DataTypes.STRING, allowNull: false, uniqueKey: true },
    petFriendly: { type: DataTypes.BOOLEAN, allowNull: false },
    venueSubcategory: { type: DataTypes.INTEGER, allowNull: false },
    foodOffered: { type: DataTypes.BOOLEAN, allowNull: false },
    drinksOffered: { type: DataTypes.BOOLEAN, allowNull: false },
    shortformDescription: { type: DataTypes.STRING, allowNull: false },
    fullDescription: { type: DataTypes.STRING, allowNull: false },
    websiteUrl: { type: DataTypes.STRING, allowNull: false },
    photoUrl: { type: DataTypes.STRING},
    multiActivity: { type: DataTypes.BOOLEAN, allowNull: false },
    discoveryScalar: { type: DataTypes.INTEGER, allowNull: false },
    partner: { type: DataTypes.BOOLEAN }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  /*
  Recreation.associate = function (models) {
    models.Recreation.belongsTo(models.Venue, {
        targetKey: 'venueID',
        onDelete: "CASCADE"
    });
  };
  */

  return VENUE;
};