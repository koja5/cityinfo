require("dotenv").config();
const express = require("express");
const router = express.Router();
const fs = require("fs");
const sha1 = require("sha1");
const request = require("request");

module.exports = router;

router.post("/verificationMailAddress", function (req, res, next) {
  console.log("USAO SAM OVDE!");
  var body = JSON.parse(
    fs.readFileSync("./providers/mail_server/config.json", "utf-8")
  );
  body.activate_mail.fields["email"] = req.body.email;
  body.activate_mail.fields["link"] =
    process.env.link_api + "/verificationMail/" + sha1(req.body.email);
  var options = {
    url: process.env.link_api + "mail-server/sendMail",
    method: "POST",
    body: body.activate_mail,
    json: true,
  };
  console.log(options);
  request(options, function (error, response, body) {
    if (!error) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
});

router.post("/sentLinkToEmailForReset", function (req, res, next) {
    var body = JSON.parse(
      fs.readFileSync("./providers/mail_server/config.json", "utf-8")
    );
    body.reset_password.fields["email"] = req.body.email;
    body.reset_password.fields["link"] =
      process.env.link_client + "/change-password/" + sha1(req.body.email);
    var options = {
      url: process.env.link_api + "mail-server/sendMail",
      method: "POST",
      body: body.reset_password,
      json: true,
    };
    console.log(options);
    request(options, function (error, response, body) {
      if (!error) {
        res.json(true);
      } else {
        res.json(false);
      }
    });
  });