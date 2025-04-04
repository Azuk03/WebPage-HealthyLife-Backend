"use strict";
const { Model } = require("sequelize");
const { getDataType } = require("../utils/dbTypes");

module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Clinic có nhiều Doctor thông qua Doctor_Infor
      Clinic.hasMany(models.Doctor_Infor, {
        foreignKey: "clinicId",
        as: "clinicData",
      });
    }
  }
  Clinic.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptionMarkdown: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      descriptionHTML: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: getDataType({ DataTypes }, "BLOB"),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Clinic",
    }
  );
  return Clinic;
};
