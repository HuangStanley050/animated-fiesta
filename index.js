//import serverless from "serverless-http";
//import express from "express";

import nodeMailer from "nodemailer";
import axios from "axios";
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
  //console.log("I am running at every 1 mins");
  const term = "mountain";
  const queryString = `https://api.unsplash.com/photos/random?query=${term}&client_id=${process.env.UNSPLASH_KEY}`;
  let result = await axios.get(queryString);
  console.log(result.data);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
  });
};
