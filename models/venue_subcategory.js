'use strict';

module.exports = (sequelize, DataTypes) => {
  var VENUE_SUBCATEGORY = sequelize.define('VENUE_SUBCATEGORY', {
    subcategoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
    subcategoryName: { type: DataTypes.STRING, allowNull: false },
    categoryID: { 
      type: DataTypes.INTEGER, allowNull: false,
      references: {
        model: 'VENUE_CATEGORY',
        key: 'categoryID',
        onUpdate: "CASCADE"
      },
      field: 'parentID'
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return VENUE_SUBCATEGORY;
};