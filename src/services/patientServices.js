import { where } from "sequelize";
import db from "../models";
require("dotenv").config();
import emailServices from "../services/emailServices";
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  let result = "";
  result = `${process.env.URL_REACT}verify-booking-appointment?token=${token}&doctorId=${doctorId}`;
  return result;
};

let postBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        let token = uuidv4();

        await emailServices.sendAEmail({
          receiverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            role: "R3",
            gender: data.selectedGender,
            address: data.address,
            firstName: data.fullName
          },
        });

        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }

        resolve({
          errCode: 0,
          errMessage: "Save patient infor succeed!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let postVerifyBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: { doctorId: data.doctorId, token: data.token, statusId: 'S1'},
          raw: false
        });
        if(appointment) {
            appointment.statusId = 'S2'
            await appointment.save();
            resolve({
                errCode: 0,
                errMessage: "Update the appointment succeed!"
            })
        } else {
            resolve({
                errCode: 2,
                errMessage: "The appointment has been activated or does not exist.!"
            })
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  postBookAppointmentService: postBookAppointmentService,
  postVerifyBookAppointmentService: postVerifyBookAppointmentService,
};
