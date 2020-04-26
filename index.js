//import serverless from "serverless-http";
//import express from "express";

import nodeMailer from "nodemailer";
import axios from "axios";
//const app = express();

export const cronEmail = async () => {
  //console.log("I am running at every 1 mins");

  const imageRequest = `https://api.unsplash.com/photos/random?&client_id=${process.env.UNSPLASH_KEY}`;
  const quoteRequest = `http://quotes.rest/qod.json?category=inspire`;

  let result = await axios.get(imageRequest);
  let quote = await axios.get(quoteRequest);

  // console.log(result.data.urls.regular);
  // console.log(quote.data.contents.quotes[0].quote);
  const imageUrl = result.data.urls.regular;
  const inspireQuote = quote.data.contents.quotes[0].quote;

  const emailTemplate = `
  <!doctype html>
  <html lang="en">
    <head>
      <!-- Required meta tags -->
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

      <!-- Bootstrap CSS -->
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

      <title>Motivational Email</title>
    </head>
    <body>
      <div class="container">
        <div class="jumbotron">
          <img src=${imageUrl}/>
          <h1 class="display-4">${inspireQuote}</h1>

        </div>
      </div>

      <!-- Optional JavaScript -->
      <!-- jQuery first, then Popper.js, then Bootstrap JS -->
      <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    </body>
  </html>
  `;
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
    html: emailTemplate,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
  });
};
