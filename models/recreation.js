'use strict';

module.exports = (sequelize, DataTypes) => {
  var recreation = sequelize.define('recreation', {
    recreationid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
    venueid: { type: DataTypes.INTEGER, allowNull: false },
    recreationname: { type: DataTypes.STRING, allowNull: false },
    minduration: { type: DataTypes.INTEGER, allowNull: false },
    maxduration: { type: DataTypes.INTEGER, allowNull: false },
    mincost: { type: DataTypes.INTEGER, allowNull: false },
    maxcost: { type: DataTypes.INTEGER, allowNull: false },
    recreationlast: { type: DataTypes.BOOLEAN, allowNull: false },
    timestart: { type: DataTypes.INTEGER },
    timefinish: { type: DataTypes.INTEGER },
    minparticipant: { type: DataTypes.INTEGER, allowNull: false },
    maxparticipant: { type: DataTypes.INTEGER, allowNull: false },
    weathervalidity: { type: DataTypes.INTEGER, allowNull: false },
    wintervalidity: { type: DataTypes.BOOLEAN, defaultValue: false },
    springvalidity: { type: DataTypes.BOOLEAN, defaultValue: false },
    summervalidity: { type: DataTypes.BOOLEAN, defaultValue: false },
    fallvalidity: { type: DataTypes.BOOLEAN, defaultValue: false },
    reservationrequired: { type: DataTypes.BOOLEAN, allowNull: false },
    activitylevel: { type: DataTypes.INTEGER, allowNull: false },
    shortformdescription: { type: DataTypes.STRING, allowNull: false },
    "21andUp": { type: DataTypes.BOOLEAN, allowNull: false },
    fulldescription: { type: DataTypes.STRING },
    photourl: { type: DataTypes.STRING }
  }, {
    freezeTableName: true
  });

  recreation.associate = function (models) {
    models.recreation.belongsTo(models.venue, {
        as: 'Venue',
        foreignKey: 'venueid',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    models.recreation.belongsToMany(models.itinerary, {
        as: 'ItineraryList',
        through: 'itinerary_recreation_dl',
        foreignKey: 'recreationid',
        otherKey: 'itineraryid',
        onUpdate: "CASCADE"
      });
    models.recreation.hasOne(models.recreation_days, {
        as: 'Days',
        sourceKey: 'recreationid',
        onUpdate: "CASCADE"
      });
    models.recreation.hasOne(models.recreation_google_hours, {
        as: 'GoogleHours',
        sourceKey: 'recreationid',
        onUpdate: "CASCADE"
      });
    models.recreation.hasMany(models.recreation_mood, {
        as: 'Moods',
        sourceKey: 'recreationid',
        onUpdate: "CASCADE"
      });
  };

  return recreation;
};