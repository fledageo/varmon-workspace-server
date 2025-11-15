const nodemailer = require("nodemailer");

const getTransporter = () => {
  if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
    throw new Error("Missing EMAIL or EMAIL_PASSWORD in env");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};


const sendMail = async (userId, email, token, type) => {
  const transporter = getTransporter();
  let activationLink;

  const mail = {
    from: `"Varmon Ադմին" <${process.env.EMAIL}>`,
    to: email,
  };

  if (type === "invite") {
    activationLink = `${process.env.FRONTEND_URL}/activate/${userId}?token=${token}`;
    mail.subject = "Դուք հրավիրված եք միանալու Varmon workspace-ին";
    mail.html = `<h3>Բարի գալուստ! Սեղմեք <a href="${activationLink}">այստեղ</a>՝ ձեր հաշիվը ակտիվացնելու համար:</h3>`;
  } else if (type === "reset") {
    activationLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    mail.subject = "Փոխել գաղտնաբառը";
    mail.html = `<h3>Սեղմեք <a href="${activationLink}">այստեղ</a>՝ ձեր գաղտնաբառը փոխելու համար:</h3>`;
  } else {
    return false;
  }             

  return transporter.sendMail(mail);
};

exports.getTransporter = getTransporter;
exports.sendMail = sendMail;
