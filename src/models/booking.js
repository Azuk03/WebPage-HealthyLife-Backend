"use strict";

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      statusId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      timeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "Bookings",
      timestamps: true,
    }
  );

  Booking.associate = function (models) {
    Booking.belongsTo(models.User, {
      foreignKey: "doctorId",
      targetKey: "id",
      as: "doctorData",
    });

    Booking.belongsTo(models.User, {
      foreignKey: "patientId",
      targetKey: "id",
      as: "patientData",
    });

    Booking.belongsTo(models.Allcode, {
      foreignKey: "statusId",
      targetKey: "keyMap",
      as: "statusData",
    });

    Booking.belongsTo(models.Allcode, {
      foreignKey: "timeType",
      targetKey: "keyMap",
      as: "timeData",
    });
  };

  return Booking;
};
