require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const auth = require("./config/auth");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({
  // uploadDir: "./providers/file_uploads",
  uploadDir: "../../CityInfo/client/src/assets/file_upload",
  auth,
});
const logger = require("./config/logger");
const path = require("path");

module.exports = router;

var connection = mysql.createPool({
  host: "116.203.109.78",
  user: "cityinfo_root",
  password: "p37wMevidufqWjbcg9hb1#DB",
  database: "cityinfo_prod",
});

connection.getConnection(function (err, conn) {
  console.log(err);
  console.log(conn);
});

router.post(
  "/createAdsDraft",
  multipartMiddleware,
  async function (req, res, next) {
    try {
      connection.getConnection(async function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          return res.json(err);
        }

        const ads = JSON.parse(req.body.additionalData);
        if (ads["cover"]) {
          ads["cover_old"] = ads["cover"];
        }
        ads["cover"] = req.files.UploadFiles.path;

        if (ads["cover_old"]) {
          delete ads["cover_old"];
          conn.query(
            "update ads_draft set ? where id = ?",
            [ads, ads.id],
            function (err, rows, fields) {
              conn.release();
              if (err) {
                logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(false);
              } else {
                res.json(ads);
              }
            }
          );
        } else {
          conn.query(
            "insert into ads_draft set ?",
            [ads],
            function (err, rows, fields) {
              conn.release();
              if (err) {
                logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(false);
              } else {
                res.json(true);
              }
            }
          );
        }
      });
    } catch (err) {
      logger.log("error", err);
    }
  }
);

router.post(
  "/uploadAdsDraft",
  multipartMiddleware,
  async function (req, res, next) {
    try {
      connection.getConnection(async function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          return res.json(err);
        }

        const ads = JSON.parse(req.body.additionalData);
        ads["cover"] = req.files.UploadFiles.path;

        conn.query(
          "update ads_draft SET ? where id = ?",
          [ads, ads.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
            } else {
              res.json(true);
            }
          }
        );
      });
    } catch (err) {
      logger.log("error", err);
    }
  }
);

router.post("/getImage", async (req, res, next) => {
  console.log(req.body);
  if (req.body.path !== "null") {
    req.body.path = req.body.path.toString().replace("providers\\", "");
    filepath = path.join(__dirname, req.body.path);
    res.sendFile(filepath);
  } else {
    res.send(null);
  }
});
