"use strict";
const { Model } = require("sequelize");
const { getDataType } = require("../utils/dbTypes");

module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Specialty.hasMany(models.Doctor_Infor, {
        foreignKey: "specialtyId",
        as: "specialtyData",
      });
    }
  }
  Specialty.init(
    {
      name: {
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
      modelName: "Specialty",
    }
  );
  return Specialty;
};
