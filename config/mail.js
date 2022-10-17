const nodemailer = require("nodemailer");
const htmlToText = require("nodemailer-html-to-text").htmlToText;

// create SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE === "true" ?? false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

transporter.use("compile", htmlToText());

module.exports = transporter;
