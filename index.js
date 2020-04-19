import serverless from "serverless-http";
import express from "express";
import cron from "node-cron";
import nodeMailer from "nodemailer";

const app = express();

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "ewgodhand@gmail.com",
    pass: process.env.EMAIL_PASSWD,
  },
});
const mailOptions = {
  from: "ewgodhand@gmail.com",
  to: "infamous_godhand@yahoo.com",
  subject: `Daily Email reminder`,
  text: `Hi there, this email was automatically sent by us`,
};

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

exports.handler = serverless(app);
