const nodeMailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodeMailer.createTransport({

   service: "hotmail",
    auth: {
        user: 'fortunerealestate1234@outlook.com',
        pass: 'Fortune@123'
    }
});
  
    const mailOptions = {
      from: ' "Fortune Real Estate"<Fortunerealestate1234@outlook.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
  
    await transporter.sendMail(mailOptions);
  };
  
  module.exports = sendMail;