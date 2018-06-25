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

  VENUE_CATEGORY.associate = function(models) {
    models.VENUE_CATEGORY.hasMany(models.VENUE_SUBCATEGORY, {
        as: 'Subcategories',
        foreignKey: 'categoryID',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
  }

  return VENUE_CATEGORY;
};