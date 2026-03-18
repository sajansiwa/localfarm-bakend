"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.hasMany(models.EventPhoto, {
        foreignKey: "eventId",
        as: "photos",
      });
    }
  }

  Event.init(
    {
      eventTitle: DataTypes.STRING,
      eventDescription: DataTypes.TEXT,
      isupcoming: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "events",
    },
  );

  return Event;
};
