'use strict';

module.exports = (sequelize, DataTypes) => {
  var venue = sequelize.define('venue', {
    venueid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    venuename: { type: DataTypes.STRING, allowNull: false },
    googleplaceid: { type: DataTypes.STRING, allowNull: false, uniqueKey: true,
        validate: {
            isUnique: function (googlePlaceID) {
                venue.find({ where: { googleplaceid: googlePlaceID }})
                    .then(function (Venue) {
                        if (Venue) {
                            throw new Error('googlePlaceID already in use');
                        }
                    });
            }
        }
    },
    petfriendly: { type: DataTypes.BOOLEAN, allowNull: false },
    subcategoryid: { 
      type: DataTypes.INTEGER, allowNull: false,
      field: 'venuesubcategory'
    },
    foodoffered: { type: DataTypes.BOOLEAN, allowNull: false },
    drinksoffered: { type: DataTypes.BOOLEAN, allowNull: false },
    shortformdescription: { type: DataTypes.STRING, allowNull: false },
    fulldescription: { type: DataTypes.STRING, allowNull: false },
    websiteurl: { type: DataTypes.STRING },
    photourl: { type: DataTypes.STRING },
    multiactivity: { type: DataTypes.BOOLEAN, allowNull: false },
    discoveryscalar: { type: DataTypes.INTEGER, allowNull: false },
    partner: { type: DataTypes.BOOLEAN }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  venue.associate = function(models) {
    models.venue.hasMany(models.recreation, {
        as: 'Recreations',
        foreignKey: 'venueid',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
  }

  return venue;
};