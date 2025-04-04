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
      // define association here
    }
  }
  Specialty.init(
    {
      name: DataTypes.STRING,
      descriptionMarkdown: {
        type: getDataType(sequelize, "TEXT"),
        allowNull: true,
      },
      descriptionHTML: {
        type: getDataType(sequelize, "TEXT"),
        allowNull: true,
      },
      image: {
        type: getDataType(sequelize, "BLOB"),
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
