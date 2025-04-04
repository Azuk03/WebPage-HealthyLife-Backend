// Hỗ trợ kiểu dữ liệu phù hợp cho cả MySQL và PostgreSQL
const getDataType = (sequelize, type) => {
  const env = process.env.NODE_ENV || "development";
  const isProduction = env === "production";

  // Đảm bảo rằng sequelize và DataTypes đều tồn tại
  const DataTypes =
    sequelize && sequelize.DataTypes
      ? sequelize.DataTypes
      : require("sequelize").DataTypes;

  switch (type) {
    case "BOOLEAN":
      return isProduction ? DataTypes.BOOLEAN : DataTypes.TINYINT(1);
    case "BLOB":
      return isProduction ? DataTypes.BYTEA : DataTypes.BLOB("long");
    case "TEXT":
      return DataTypes.TEXT; // Giống nhau cho cả môi trường
    default:
      return DataTypes[type] || DataTypes.STRING; // Fallback về STRING nếu không tìm thấy
  }
};

module.exports = { getDataType };
