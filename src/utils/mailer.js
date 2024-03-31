const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mohammad.h.zbib@gmail.com",
    pass: "rhhe fqrp sqcl pdru",
  },
});

const sendEmail = (to, subject, html) => {
  const mailOptions = {
    from: "mohammad.habib.zbib@gmail.com",
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent " + info.response);
    }
  });
};

module.exports = sendEmail;
