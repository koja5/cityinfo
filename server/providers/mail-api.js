require("dotenv").config();
const express = require("express");
const router = express.Router();
const fs = require("fs");
const sha1 = require("sha1");
const request = require("request");

module.exports = router;

router.post("/verificationMailAddress", function (req, res, next) {
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

router.post("/sendRequestForFreeAd", function (req, res, next) {
  var body = JSON.parse(
    fs.readFileSync("./providers/mail_server/config.json", "utf-8")
  );
  body.send_request_for_free_ad.fields["id"] = req.body.id;
  body.send_request_for_free_ad.fields["start_date"] = new Date(
    req.body.start_date
  )
    .toLocaleString("en-US")
    .substring(0, 9);
  body.send_request_for_free_ad.fields["ads_name"] = req.body.ads_name;
  body.send_request_for_free_ad.fields["city_name"] = req.body.city_name;
  body.send_request_for_free_ad.fields["number_of_weeks"] =
    req.body.number_of_weeks;
  var options = {
    url: process.env.link_api + "mail-server/sendMail",
    method: "POST",
    body: body.send_request_for_free_ad,
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

router.post("/infoForActiveFreeAd", function (req, res, next) {
  var body = JSON.parse(
    fs.readFileSync("./providers/mail_server/config.json", "utf-8")
  );
  body.info_for_active_free_ad.fields["email"] = req.body.email;
  body.info_for_active_free_ad.fields["greeting"] =
    body.info_for_active_free_ad.fields["greeting"].replace(
      "{firstname}",
      req.body.firstname
    );
  var options = {
    url: process.env.link_api + "mail-server/sendMail",
    method: "POST",
    body: body.info_for_active_free_ad,
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
