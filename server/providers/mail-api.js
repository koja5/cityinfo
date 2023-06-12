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
    rejectUnauthorized: false,
    url: process.env.link_api + "mail-server/sendMail",
    method: "POST",
    body: body.activate_mail,
    json: true,
  };
  request(options, function (error, response, body) {
    if (!error) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
});

router.post("/verificationMailAddressForClub", function (req, res, next) {
  var body = JSON.parse(
    fs.readFileSync("./providers/mail_server/config.json", "utf-8")
  );
  body.activate_mail_for_club.fields["email"] = req.body.email;
  body.activate_mail_for_club.fields["link"] =
    process.env.link_api + "/verificationMailForClub/" + sha1(req.body.email);
  var options = {
    rejectUnauthorized: false,
    url: process.env.link_api + "mail-server/sendMail",
    method: "POST",
    body: body.activate_mail_for_club,
    json: true,
  };
  request(options, function (error, response, body) {
    if (!error) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
});

router.post("/sendInfoForNewCreatedClubAccount", function (req, res, next) {
  var body = JSON.parse(
    fs.readFileSync("./providers/mail_server/config.json", "utf-8")
  );
  body.send_request_for_new_created_club_account.fields["email_info"] =
    req.body.email;
  body.send_request_for_new_created_club_account.fields["firstname"] =
    req.body.firstname;

  body.send_request_for_new_created_club_account.fields["link"] =
    process.env.link_api + "activeClub/" + sha1(req.body.email);
  body.send_request_for_new_created_club_account.fields["deactive"] =
    process.env.link_api + "deactiveClub/" + sha1(req.body.email);
  var options = {
    rejectUnauthorized: false,
    url: process.env.link_api + "mail-server/sendMail",
    method: "POST",
    body: body.send_request_for_new_created_club_account,
    json: true,
  };
  request(options, function (error, response, body) {
    if (!error) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
});

router.post("/infoApprovedClubAccountFromAdmin", function (req, res, next) {
  var body = JSON.parse(
    fs.readFileSync("./providers/mail_server/config.json", "utf-8")
  );
  body.info_approved_club_account_from_admin.fields["email"] = req.body.email;
  body.info_approved_club_account_from_admin.fields["greeting"] =
    body.info_approved_club_account_from_admin.fields["greeting"].replace(
      "{firstname}",
      req.body.firstname
    );
  var options = {
    rejectUnauthorized: false,
    url: process.env.link_api + "mail-server/sendMail",
    method: "POST",
    body: body.info_approved_club_account_from_admin,
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

router.post("/infoDeactiveClubAccountFromAdmin", function (req, res, next) {
  var body = JSON.parse(
    fs.readFileSync("./providers/mail_server/config.json", "utf-8")
  );
  body.info_deactive_club_account_from_admin.fields["email"] = req.body.email;
  body.info_deactive_club_account_from_admin.fields["greeting"] =
    body.info_deactive_club_account_from_admin.fields["greeting"].replace(
      "{firstname}",
      req.body.firstname
    );
  var options = {
    rejectUnauthorized: false,
    url: process.env.link_api + "mail-server/sendMail",
    method: "POST",
    body: body.info_deactive_club_account_from_admin,
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
  body.info_about_changed_user_data.fields["email"] = req.body.email;
  body.info_about_changed_user_data.fields["greeting"] =
    body.info_about_changed_user_data.fields["greeting"].replace(
      "{firstname}",
      req.body.firstname
    );
  var options = {
    rejectUnauthorized: false,
    url: process.env.link_api + "mail-server/sendMail",
    method: "POST",
    body: body.info_about_changed_user_data,
    json: true,
  };
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
    process.env.link_client + "forgot-password/" + sha1(req.body.email);
  var options = {
    rejectUnauthorized: false,
    url: process.env.link_api + "mail-server/sendMail",
    method: "POST",
    body: body.reset_password,
    json: true,
  };
  request(options, function (error, response, body) {
    if (!error) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
  res.json(true);
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
  body.send_request_for_free_ad.fields["link"] =
    process.env.link_client + "dashboard/superadmin/preview-ad/" + req.body.id;
  var options = {
    rejectUnauthorized: false,
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
    rejectUnauthorized: false,
    url: process.env.link_api + "mail-server/sendMail",
    method: "POST",
    body: body.info_for_active_free_ad,
    json: true,
  };

  request(options, function (error, response, body) {
    if (!error) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
});

router.post("/infoForDenyFreeAd", function (req, res, next) {
  var body = JSON.parse(
    fs.readFileSync("./providers/mail_server/config.json", "utf-8")
  );
  body.info_for_deny_free_ad.fields["email"] = req.body.email;
  body.info_for_deny_free_ad.fields["greeting"] =
    body.info_for_deny_free_ad.fields["greeting"].replace(
      "{firstname}",
      req.body.firstname
    );
  var options = {
    rejectUnauthorized: false,
    url: process.env.link_api + "mail-server/sendMail",
    method: "POST",
    body: body.info_for_deny_free_ad,
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

router.post("/sendRequestToCheckPlace", function (req, res, next) {
  var body = JSON.parse(
    fs.readFileSync("./providers/mail_server/config.json", "utf-8")
  );

  body.send_request_to_check_place.fields["cover"] =
    process.env.link_client + req.body.cover.split("./")[1];
  console.log(body.send_request_to_check_place.fields["cover"]);
  body.send_request_to_check_place.fields["name"] = req.body.name;
  body.send_request_to_check_place.fields["city_name"] = req.body.city_name;
  body.send_request_to_check_place.fields["phone"] = req.body.phone;
  body.send_request_to_check_place.fields["place_email"] = req.body.email;
  body.send_request_to_check_place.fields["description"] = req.body.description;
  body.send_request_to_check_place.fields["map_link"] = req.body.map_link;

  body.send_request_to_check_place.fields["activePlace"] =
    process.env.link_api + "activePlace/" + req.body.id + "/activePlaceText";

  body.send_request_to_check_place.fields["deactivePlaceNameOfLocation"] =
    process.env.link_api +
    "deactivePlace/" +
    req.body.id +
    "/deactivePlaceNameOfLocationText";

  body.send_request_to_check_place.fields["deactivePlacePicture"] =
    process.env.link_api +
    "deactivePlace/" +
    req.body.id +
    "/deactivePlacePictureText";

  body.send_request_to_check_place.fields["deactivePlacePicture"] =
    process.env.link_api +
    "deactivePlace/" +
    req.body.id +
    "/deactivePlacePictureText";

  body.send_request_to_check_place.fields["deactivePlaceDescription"] =
    process.env.link_api +
    "deactivePlace/" +
    req.body.id +
    "/deactivePlaceDescriptionText";

  body.send_request_to_check_place.fields["deactivePlaceMapsPosition"] =
    process.env.link_api +
    "deactivePlace/" +
    req.body.id +
    "/deactivePlaceMapsPositionText";

  body.send_request_to_check_place.fields["deactivePlaceSamePlace"] =
    process.env.link_api +
    "deactivePlace/" +
    req.body.id +
    "/deactivePlaceSamePlaceText";

  body.send_request_to_check_place.fields["deactivePlaceOther"] =
    process.env.link_api +
    "deactivePlace/" +
    req.body.id +
    "/deactivePlaceOtherText";

  var options = {
    rejectUnauthorized: false,
    url: process.env.link_api + "mail-server/sendMailWithAttachment",
    method: "POST",
    body: body.send_request_to_check_place,
    json: true,
  };
  request(options, function (error, response, body) {
    if (!error) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
  res.json(true);
});

router.post("/sendInfoToCustomerForPlace", function (req, res, next) {
  var body = JSON.parse(
    fs.readFileSync("./providers/mail_server/config.json", "utf-8")
  );

  body.send_info_to_customer_for_place.fields["greeting"] =
    body.send_info_to_customer_for_place.fields["greeting"].replace(
      "{firstname}",
      req.body.firstname
    );
  body.send_info_to_customer_for_place.fields["text"] =
    body.send_info_to_customer_for_place.fields[req.body.customText];
  body.send_info_to_customer_for_place.fields["email"] = req.body.user_email;
  body.send_info_to_customer_for_place.fields["cover"] =
    process.env.link_client + req.body.cover.split("./")[1];
  body.send_info_to_customer_for_place.fields["name"] = req.body.name;
  body.send_info_to_customer_for_place.fields["city_name"] = req.body.city_name;
  body.send_info_to_customer_for_place.fields["phone"] = req.body.phone;
  body.send_info_to_customer_for_place.fields["place_email"] = req.body.email;
  body.send_info_to_customer_for_place.fields["description"] =
    req.body.description;
  body.send_info_to_customer_for_place.fields["map_link"] = req.body.map_link;

  var options = {
    rejectUnauthorized: false,
    url: process.env.link_api + "mail-server/sendMailWithAttachment",
    method: "POST",
    body: body.send_info_to_customer_for_place,
    json: true,
  };
  request(options, function (error, response, body) {
    if (!error) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
  res.json(true);
});
