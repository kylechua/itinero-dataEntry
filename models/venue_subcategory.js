'use strict';

module.exports = (sequelize, DataTypes) => {
  var venue_subcategory = sequelize.define('venue_subcategory', {
    subcategoryid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
    subcategoryname: { type: DataTypes.STRING, allowNull: false },
    categoryid: { 
      type: DataTypes.INTEGER, allowNull: false,
      references: {
        model: 'venue_category',
        key: 'categoryid',
        onUpdate: "CASCADE"
      },
      field: 'parentid'
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  venue_subcategory.associate = function(models) {
    models.venue_subcategory.belongsTo(models.venue_category, {
      as: 'Category',
      foreignKey: 'parentid',
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
  }

  return venue_subcategory;
};