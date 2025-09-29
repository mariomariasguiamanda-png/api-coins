import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendMail(to, name, body, subject, attachments = []) {
  const smtp = transporter;

  await smtp.sendMail({
    from: `"Coins for Study" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: body,
    attachments,
  });
}

export default sendMail;
