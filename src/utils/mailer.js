const { MailerSend } = require("mailersend");
const logger = require("./logger");

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY
});

async function sendMail(userId, email, token, type) {
  const linkPrefix = process.env.FRONTEND_URL || "http://localhost:5173";

  let subject = "";
  let html = "";

  if (type === "invite") {
    subject = "Դուք հրավիրված եք միանալու Varmon workspace-ին";
    html = `<h3>Բարի գալուստ! Սեղմեք <a href="${linkPrefix}/activate/${userId}?token=${token}">այստեղ</a>՝ ձեր հաշիվը ակտիվացնելու համար:</h3>`;
  } else if (type === "reset") {
    subject = "Փոխել գաղտնաբառը";
    html = `<h3>Սեղմեք <a href="${linkPrefix}/reset-password?token=${token}">այստեղ</a>՝ ձեր գաղտնաբառը փոխելու համար:</h3>`;
  } else {
    throw new Error("Unknown email type");
  }

  try {
    const response = await mailersend.email.send({
      from: {
        email: process.env.MAILERSEND_FROM_EMAIL,
        name: process.env.MAILERSEND_FROM_NAME
      },
      to: [{ email, name: email }],
      subject,
      html
    });

    logger.info(`Mailersend: email sent to ${email}`);
    return response;
  } catch (err) {
    logger.error(`Mailersend failed for ${email}: ${err && err.stack ? err.stack : err}`);
    throw err;
  }
}

module.exports = { sendMail };