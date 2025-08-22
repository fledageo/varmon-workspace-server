import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

const sendMail = async function (userId, email, token, type) {
    let activationLink;
    const mail = {
        from: `"Varmon-workspace Ադմին" <${process.env.EMAIL}>`,
        to: email,
    };
    if (type === "invite") {
        activationLink = `${process.env.FRONTEND_URL}/activate/${userId}?token=${token}`
        mail.subject = "Դուք հրավիրված եք միանալու Varmon workspace-ին"
        mail.html = `<h3>Բարի գալուստ! Սեղմեք <a href="${activationLink}">այստեղ</a>՝ ձեր հաշիվը ակտիվացնելու համար:</h3>`
    } else {
        activationLink = `${process.env.FRONTEND_URL}/reset/password?token=${token}`
        mail.subject = "Փոխել գաղտնաբառը"
        mail.html = `<h3>Սեղմեք <a href="${activationLink}">այստեղ</a>՝ ձեր գաղտնաբառը փոխելու համար:</h3>`
    }

    return transporter.sendMail(mail);
}

export default sendMail