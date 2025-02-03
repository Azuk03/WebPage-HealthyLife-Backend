import clinicServices from "../services/clinicServices";

let createClinic = async (req, res) => {
  try {
    let infor = await clinicServices.createClinicService(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getAllClinic = async (req,res) => {
  try {
    let infor = await clinicServices.getAllClinicService();
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
} 

let getDetailClinicById = async (req,res) => {
  try {
    let infor = await clinicServices.getDetailClinicByIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
} 

module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,

};
