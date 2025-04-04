"use strict";
const { Model } = require("sequelize");
const { getDataType } = require("../utils/dbTypes");

module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Markdown.belongsTo(models.User, { foreignKey: "doctorId" });
    }
  }
  Markdown.init(
    {
      contentHTML: {
        type: getDataType(sequelize, "TEXT"),
        allowNull: true,
      },
      contentMarkdown: {
        type: getDataType(sequelize, "TEXT"),
        allowNull: true,
      },
      description: {
        type: getDataType(sequelize, "TEXT"),
        allowNull: true,
      },
      doctorId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Markdown",
    }
  );
  return Markdown;
};
