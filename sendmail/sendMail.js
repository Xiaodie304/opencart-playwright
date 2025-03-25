import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function sendMail() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const filePath = path.join(__dirname, "../playwright-report.zip");
  if (!fs.existsSync(filePath)) {
    console.log("❌ File does not exist:", filePath);
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.MAIL_TO,
    subject: "Playwright Test Report",
    text: "Here is the Playwright test report.",
    attachments: [{ filename: "playwright-report.zip", path: filePath }],
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: " + info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

sendMail();
