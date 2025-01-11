require("dotenv").config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_APP,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

let sendAEmail = async (dataSend) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Tran Quang Hieu 👻" <meocuptai2@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
    html: getBodyHTMLEmail(dataSend),
    // html body
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Nếu bạn nhận được email này, bạn đã đặt lịch khám bệnh online thành công trên HealthyLife</p>
    <p>Thông tin đặt lịch khám bệnh: </p>
    <div>
        <b>Thời gian: ${dataSend.time}</b>
    </div>
    <div>
        <b>Bác sĩ: ${dataSend.doctorName}</b>
    </div>
    <p>Bạn hãy xác nhận những thông tin trên và ấn vào đường link ở dưới để xác nhận và hoàn tất thủ tục!</p>
    <div>
        <a href=${dataSend.redirectLink} target="_blank" >Ấn vào đây</a>
    </div>
    <p>Xin chân thành cảm ơn!</p>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Hello ${dataSend.patientName}!</h3>
<p>If you receive this email, you have successfully scheduled an online medical appointment on HealthyLife.</p>
<p>Details of your appointment:</p>
<div>
    <b>Time: ${dataSend.time}</b>
</div>
<div>
    <b>Doctor: ${dataSend.doctorName}</b>
</div>
<p>Please confirm the above information and click on the link below to confirm and complete the procedure!</p>
<div>
    <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
</div>
<p>Thank you very much!</p>
    `;
  }

  return result;
};

module.exports = {
  sendAEmail: sendAEmail,
};
