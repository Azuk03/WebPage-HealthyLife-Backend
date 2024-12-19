import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcrypt";
import { raw } from "body-parser";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hash(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);  
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isUserExist = await checkUserEmail(email);
      if (isUserExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password", "firstName", "lastName"],
          where: { email: email },
          raw: true,
        });
        // check database again
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Oke!";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found`;
        }
      } else {
        // return error
        userData.errCode = 1;
        userData.errMessage = `Your email is not exsist!`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
        raw: false,
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }

      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        return resolve({
          errCode: 1,
          message: "Your email is already in used.Please use another email!",
        });
      }
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        roleId: data.roleId,
        positionId: data.positionId,
        image: data.avatar,
      });

      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (
        !user ||
        !user.id ||
        !user.roleId ||
        !user.positionId ||
        !user.gender
      ) {
        resolve({
          errCode: 2,
          message: "User is not found",
        });
      }
      (user.firstName = data.firstName),
        (user.lastName = data.lastName),
        (user.address = data.address),
        (user.phoneNumber = data.phoneNumber),
        (user.gender = data.gender),
        (user.roleId = data.roleId),
        (user.positionId = data.positionId),
        (user.gender = data.gender);
        if(data.avatar) {
          (user.image = data.avatar);
        }
      await user.save();
      resolve({
        errCode: 0,
        message: "Updated succeed!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (!user) {
        resolve({
          errCode: 2,
          message: "User is not exist",
        });
      }
      await db.User.destroy({
        where: { id: userId },
      });
      resolve({
        errCode: 0,
        message: "Deleted succeed",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters !",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getAllCodeService: getAllCodeService,
};
