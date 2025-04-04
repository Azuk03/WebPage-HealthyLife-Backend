const { Sequelize } = require("sequelize");
require("dotenv").config();

// Xác định môi trường hiện tại
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

let connectdb = async () => {
  let sequelize;

  try {
    // Chỉ sử dụng DATABASE_URL khi ở môi trường production (Render)
    if (env === "production" && process.env.DATABASE_URL) {
      console.log("Connecting to PostgreSQL database using DATABASE_URL...");
      sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: false,
      });
    } else {
      // Sử dụng MySQL cho local development
      console.log(
        `Connecting to ${config.dialect} database: ${config.database} on ${config.host}...`
      );
      sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        {
          host: config.host,
          port: config.port || (config.dialect === "mysql" ? 3306 : 5432),
          dialect: config.dialect,
          logging: config.logging,
          dialectOptions: config.dialectOptions,
          query: config.query,
          timezone: config.timezone,
        }
      );
    }

    // Kiểm tra kết nối
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Gán biến sequelize để models/index.js có thể sử dụng (nếu cần)
    global.sequelize = sequelize;

    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

module.exports = connectdb;
