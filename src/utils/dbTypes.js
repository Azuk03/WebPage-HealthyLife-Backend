// Hỗ trợ kiểu dữ liệu phù hợp cho cả MySQL và PostgreSQL
const getDataType = (sequelize, type) => {
  const env = process.env.NODE_ENV || "development";
  const isProduction = env === "production";

  switch (type) {
    case "BOOLEAN":
      return isProduction
        ? sequelize.DataTypes.BOOLEAN
        : sequelize.DataTypes.TINYINT(1);
    case "BLOB":
      return isProduction
        ? sequelize.DataTypes.BYTEA
        : sequelize.DataTypes.BLOB("long");
    case "TEXT":
      return isProduction ? sequelize.DataTypes.TEXT : sequelize.DataTypes.TEXT;
    default:
      return sequelize.DataTypes[type];
  }
};

module.exports = { getDataType };
