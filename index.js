//import serverless from "serverless-http";
//import express from "express";

import nodeMailer from "nodemailer";

//const app = express();

const transporter = nodeMailer.createTransport({
  service: "yahoo",
  auth: {
    user: "infamous_godhand@yahoo.com",
    pass: process.env.EMAIL_PASSWD,
  },
});
const mailOptions = {
  from: "infamous_godhand@yahoo.com",
  to: "ewgodhand@gmail.com",
  subject: `Daily Email reminder`,
  text: `Hi there, this email was automatically sent by us`,
};

export const cronEmail = async () => {
  console.log("I am running at every 1 mins");

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
  });
};
