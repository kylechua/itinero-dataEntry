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
    googlePlaceID: { type: DataTypes.STRING, allowNull: false, uniqueKey: true,
        validate: {
            isUnique: function (googlePlaceID) {
                VENUE.find({ where: { googlePlaceID: googlePlaceID }})
                    .then(function (venue) {
                        if (venue) {
                            throw new Error('googlePlaceID already in use');
                        }
                    });
            }
        }
    },
    petFriendly: { type: DataTypes.BOOLEAN, allowNull: false },
    subcategoryID: { 
      type: DataTypes.INTEGER, allowNull: false,
      field: 'venueSubcategory'
    },
    foodOffered: { type: DataTypes.BOOLEAN, allowNull: false },
    drinksOffered: { type: DataTypes.BOOLEAN, allowNull: false },
    shortformDescription: { type: DataTypes.STRING, allowNull: false },
    fullDescription: { type: DataTypes.STRING, allowNull: false },
    websiteUrl: { type: DataTypes.STRING },
    photoUrl: { type: DataTypes.STRING },
    multiactivity: { type: DataTypes.BOOLEAN, allowNull: false },
    discoveryScalar: { type: DataTypes.INTEGER, allowNull: false },
    partner: { type: DataTypes.BOOLEAN }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  VENUE.associate = function(models) {
    models.VENUE.hasMany(models.RECREATION, {
        as: 'Recreations',
        foreignKey: 'venueID',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
  }

  return VENUE;
};