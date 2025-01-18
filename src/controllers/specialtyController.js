import specialtyServices from '../services/specialtyServices';

let createSpecialty = async (req,res) => {
    try {
                let infor = await specialtyServices.createSpecialtyService(req.body);
                return res.status(200).json(infor)
            } catch (error) {
                console.log(error);
                res.status(200).json({
                    errCode: -1,
                    errMessage: 'Error from the server'
                })
            }
}

let getAllSpecialties = async (req,res) => {
    try {
            let specialties = await specialtyServices.getAllSpecialtiesService();
            return res.status(200).json(specialties);
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                errCode: -1,
                errMessage: "Error from server",
            })
        }
}

let getDetailSpecialtyById = async (req,res) => {
    try {
            let infor = await specialtyServices.getDetailSpecialtyByIdService(req.query.id, req.query.location);
            return res.status(200).json(infor);
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                errCode: -1,
                errMessage: "Error from server",
            })
        }
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialties: getAllSpecialties,
    getDetailSpecialtyById: getDetailSpecialtyById,
}