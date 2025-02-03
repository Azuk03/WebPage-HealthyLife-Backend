import db from "../models";

let createClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });

        resolve({
          errCode: 0,
          errMessage: "Ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllClinicService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          if (item.image) {
            try {
              item.image = new Buffer(item.image, "base64").toString("binary");
            } catch (err) {
              console.error("Error processing image for item:", item, err);
              item.image = null;
            }
          } else {
            item.image = null;
          }
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "OK",
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailClinicByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: { id: inputId },
          attributes: ["descriptionHTML", "descriptionMarkdown","name","address"],
        });

        if (data) {
          let doctorClinic = [];
            doctorClinic = await db.Doctor_Infor.findAll({
              where: { clinicId: inputId },
              attributes: ["doctorId", "provinceId"],
            });

          data.doctorClinic = doctorClinic;
        } else {
          data = {};
        }

        resolve({
          errCode: 0,
          errMessage: "OK",
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createClinicService: createClinicService,
  getAllClinicService: getAllClinicService,
  getDetailClinicByIdService: getDetailClinicByIdService,
};
