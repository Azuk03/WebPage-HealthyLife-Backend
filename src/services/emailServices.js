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

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Đây là kết quả khám bệnh và phương thuốc bác sĩ kê sau khi bạn khám xong</p>
    <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm: </p>
    <p>Xin chân thành cảm ơn vì đã sử dụng dịch vụ của chúng tôi!</p>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Hello ${dataSend.patientName}!</h3>
    <p>This is the medical examination result and the prescription given by the doctor after your check-up.</p>
    <p>The prescription/invoice details are attached in the file:</p>
    <p>We sincerely thank you for using our services!</p>
    `;
  }

  return result;
};

let sendAttachment = async (dataSend) => {
  const info = await transporter.sendMail({
    from: '"Tran Quang Hieu 👻" <meocuptai2@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Kết quả khám bệnh ✔", // Subject line
    html: getBodyHTMLEmailRemedy(dataSend),
    attachments: [
      {
        filename: `remedy-${dataSend.patientName}-${new Date().getTime()}.png`,
        content: dataSend.imgBase64.split("base64,")[1],
        encoding: "base64",
      },
    ],
    // html body
  });
};

module.exports = {
  sendAEmail: sendAEmail,
  sendAttachment: sendAttachment
};
