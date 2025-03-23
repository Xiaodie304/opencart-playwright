import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function sendMail() {
  let transporter = nodemailer.createTransport({
    service: "gmail", // Gmail SMTP service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const filePath = path.join(__dirname, "../playwright-report.zip");
  if (!fs.existsSync(filePath)) {
    console.log("File does not exist:", filePath);
    return;
  }

  const fileName = "playwright-report.zip";
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.MAIL_TO,
    subject: "Playwright Test Report",
    text: "Here is the Playwright test report.",
    attachments: [
      {
        filename: fileName,
        path: filePath,
      },
    ],
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("Error sending email:", error);
  }
}

sendMail();
