"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EventPhoto extends Model {
    static associate(models) {
      EventPhoto.belongsTo(models.Event, {
        foreignKey: "eventId",
        as: "event",
      });
    }
  }

  EventPhoto.init(
    {
      eventId: DataTypes.INTEGER,
      imagePath: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EventPhoto",
      tableName: "eventphotos",
    },
  );

  return EventPhoto;
};
