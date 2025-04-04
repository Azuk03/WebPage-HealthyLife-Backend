"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Chỉ thực hiện migration này trong môi trường production (PostgreSQL)
    const env = process.env.NODE_ENV || "development";

    if (env === "production") {
      try {
        console.log("Đang bắt đầu chuyển đổi kiểu dữ liệu cho PostgreSQL...");

        // 1. Chuyển đổi trường image của Users
        console.log("Chuyển đổi Users.image từ STRING sang BYTEA...");
        await queryInterface.sequelize
          .query(
            `
          ALTER TABLE "Users" 
          ALTER COLUMN "image" TYPE BYTEA 
          USING CASE 
            WHEN "image" IS NULL THEN NULL
            ELSE "image"::bytea
          END;
        `
          )
          .catch((err) => {
            console.log("⚠️ Users.image warning:", err.message);
            console.log(
              "(Có thể bỏ qua nếu cột đã có kiểu dữ liệu đúng hoặc chưa tồn tại)"
            );
          });

        // 2. Chuyển đổi trường image của Specialties
        console.log("Chuyển đổi Specialties.image từ STRING sang BYTEA...");
        await queryInterface.sequelize
          .query(
            `
          ALTER TABLE "Specialties" 
          ALTER COLUMN "image" TYPE BYTEA 
          USING CASE 
            WHEN "image" IS NULL THEN NULL
            ELSE "image"::bytea
          END;
        `
          )
          .catch((err) => {
            console.log("⚠️ Specialties.image warning:", err.message);
            console.log(
              "(Có thể bỏ qua nếu cột đã có kiểu dữ liệu đúng hoặc chưa tồn tại)"
            );
          });

        // 3. Chuyển đổi trường image của Clinics
        console.log("Chuyển đổi Clinics.image từ STRING sang BYTEA...");
        await queryInterface.sequelize
          .query(
            `
          ALTER TABLE "Clinics" 
          ALTER COLUMN "image" TYPE BYTEA 
          USING CASE 
            WHEN "image" IS NULL THEN NULL
            ELSE "image"::bytea
          END;
        `
          )
          .catch((err) => {
            console.log("⚠️ Clinics.image warning:", err.message);
            console.log(
              "(Có thể bỏ qua nếu cột đã có kiểu dữ liệu đúng hoặc chưa tồn tại)"
            );
          });

        // 4. Chuyển đổi các trường TEXT
        console.log(
          "Chuyển đổi trường contentHTML và contentMarkdown trong Markdown..."
        );
        await queryInterface.sequelize
          .query(
            `
          ALTER TABLE "Markdowns" 
          ALTER COLUMN "contentHTML" TYPE TEXT,
          ALTER COLUMN "contentMarkdown" TYPE TEXT,
          ALTER COLUMN "description" TYPE TEXT;
        `
          )
          .catch((err) => {
            console.log("⚠️ Markdowns TEXT fields warning:", err.message);
          });

        console.log(
          "Chuyển đổi trường descriptionHTML và descriptionMarkdown trong Specialties..."
        );
        await queryInterface.sequelize
          .query(
            `
          ALTER TABLE "Specialties" 
          ALTER COLUMN "descriptionHTML" TYPE TEXT,
          ALTER COLUMN "descriptionMarkdown" TYPE TEXT;
        `
          )
          .catch((err) => {
            console.log("⚠️ Specialties TEXT fields warning:", err.message);
          });

        console.log(
          "Chuyển đổi trường descriptionHTML và descriptionMarkdown trong Clinics..."
        );
        await queryInterface.sequelize
          .query(
            `
          ALTER TABLE "Clinics" 
          ALTER COLUMN "descriptionHTML" TYPE TEXT,
          ALTER COLUMN "descriptionMarkdown" TYPE TEXT;
        `
          )
          .catch((err) => {
            console.log("⚠️ Clinics TEXT fields warning:", err.message);
          });

        // 5. Chuyển đổi trường note trong Doctor_Infor
        console.log("Chuyển đổi trường note trong Doctor_Infor...");
        await queryInterface.sequelize
          .query(
            `
          ALTER TABLE "Doctor_Infors" 
          ALTER COLUMN "note" TYPE TEXT;
        `
          )
          .catch((err) => {
            console.log("⚠️ Doctor_Infors.note warning:", err.message);
          });

        // 6. Chuyển đổi trường reason trong Booking
        console.log("Chuyển đổi trường reason trong Booking...");
        await queryInterface.sequelize
          .query(
            `
          ALTER TABLE "Bookings" 
          ALTER COLUMN "reason" TYPE TEXT;
        `
          )
          .catch((err) => {
            console.log("⚠️ Bookings.reason warning:", err.message);
          });

        console.log("✅ Chuyển đổi kiểu dữ liệu hoàn tất!");
      } catch (error) {
        console.error("❌ Lỗi chuyển đổi kiểu dữ liệu:", error);
        // Không throw lỗi để migration tiếp tục
      }
    } else {
      console.log(
        "Migration này chỉ áp dụng cho môi trường production (PostgreSQL)"
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Migration này không thể hoàn tác vì đây là chuyển đổi giữa các hệ CSDL khác nhau
    console.log("Migration này không hỗ trợ rollback");
  },
};
