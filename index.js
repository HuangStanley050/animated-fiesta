import serverless from "serverless-http";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

exports.handler = serverless(app);
