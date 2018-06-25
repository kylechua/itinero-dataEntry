'use strict';

module.exports = (sequelize, DataTypes) => {
  var venue_category = sequelize.define('venue_category', {
    categoryid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
    categoryname: { type: DataTypes.STRING, allowNull: false }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  venue_category.associate = function(models) {
    models.venue_category.hasMany(models.venue_subcategory, {
        as: 'Category',
        foreignKey: 'categoryid',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
  }

  return venue_category;
};