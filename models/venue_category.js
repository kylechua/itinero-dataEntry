'use strict';

module.exports = (sequelize, DataTypes) => {
  var VENUE_CATEGORY = sequelize.define('VENUE_CATEGORY', {
    categoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
    categoryName: { type: DataTypes.STRING, allowNull: false }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return VENUE_CATEGORY;
};