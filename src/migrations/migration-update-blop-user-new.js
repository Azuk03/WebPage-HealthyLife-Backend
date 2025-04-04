module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `
            ALTER TABLE "Users" 
            ALTER COLUMN "image" TYPE BYTEA 
            USING "image"::bytea;
        `
      )
      .catch((error) => {
        console.error("Lỗi khi chạy migration up:", error);
        // Không làm fail migration
        console.log("Tiếp tục thực hiện migration khác...");
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `
            ALTER TABLE "Users" 
            ALTER COLUMN "image" TYPE TEXT;
        `
      )
      .catch((error) => {
        console.error("Lỗi khi chạy migration down:", error);
        throw error;
      });
  },
};
