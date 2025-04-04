import { where } from "sequelize";
import db from "../models";

let createSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
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

let getAllSpecialtiesService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({});
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

let getDetailSpecialtyByIdService = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: { id: inputId },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
        });

        if (data) {
          let doctorSpecialty = [];
          if(location === 'ALL') {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId, provinceId: location },
              attributes: ["doctorId", "provinceId"],
            });
          }
          
          data.doctorSpecialty = doctorSpecialty;
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
  createSpecialtyService: createSpecialtyService,
  getAllSpecialtiesService: getAllSpecialtiesService,
  getDetailSpecialtyByIdService: getDetailSpecialtyByIdService,
};
