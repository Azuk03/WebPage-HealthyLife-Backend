// Hỗ trợ kiểu dữ liệu phù hợp cho cả MySQL và PostgreSQL
const getDataType = (sequelize, type) => {
  const env = process.env.NODE_ENV || "development";
  const isProduction = env === "production";

  // Đảm bảo rằng sequelize và DataTypes đều tồn tại
  let DataTypes;

  if (sequelize && sequelize.DataTypes) {
    DataTypes = sequelize.DataTypes;
  } else if (
    sequelize &&
    typeof sequelize === "object" &&
    sequelize.hasOwnProperty("DataTypes")
  ) {
    // Trường hợp chỉ truyền { DataTypes } thay vì đối tượng sequelize đầy đủ
    DataTypes = sequelize.DataTypes;
  } else {
    // Import DataTypes nếu không có sẵn
    DataTypes = require("sequelize").DataTypes;
  }

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
