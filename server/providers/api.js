require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const expiresToken = "12h";
const jwt = require("jsonwebtoken");
const auth = require("./config/auth");
const logger = require("./config/logger");
const request = require("request");
const fs = require("fs");
const sha1 = require("sha1");
const stripe = require("stripe")(
  "sk_test_51LhYhHL4uVudLiXAsXYCGWFY7RhraCcUwR9wbfV2xoL04pccSeLCLkbZvbPsxhivnRp9RJmu61YGFinNd7lKzOJz00r5f2ldt5"
);

module.exports = router;

/*var connection = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});*/

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

/* GET api listing. */
router.get("/", (req, res) => {
  // res.send("api works");
});

router.post("/signUp", async function (req, res, next) {
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(err);
      }
      conn.query(
        "select * from users where email = ?",
        [req.body.email],
        async function (err, rows, fields) {
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            return res.json(err);
          }
          if (rows.length > 0) {
            res.json(false);
          } else {
            req.body.password = sha1(req.body.password);
            req.body.type = 2;
            if (req.body.is_club) {
              req.body.active = 2;
            } else {
              req.body.active = 0;
            }
            conn.query(
              "insert into users set ?",
              req.body,
              async function (err) {
                if (err) {
                  logger.log("error", err.sql + ". " + err.sqlMessage);
                  return res.json(err);
                } else {
                  logger.log("info", "New user create account!");
                  if (req.body.is_club) {
                    var options = {
                      url:
                        process.env.link_api + "verificationMailAddressForClub",
                      method: "POST",
                      body: { email: req.body.email },
                      json: true,
                    };

                    var option_request = {
                      url:
                        process.env.link_api +
                        "sendInfoForNewCreatedClubAccount",
                      method: "POST",
                      body: req.body,
                      json: true,
                    };
                    request(
                      option_request,
                      function (error, response, body) {}
                    );
                  } else {
                    var options = {
                      url: process.env.link_api + "verificationMailAddress",
                      method: "POST",
                      body: { email: req.body.email },
                      json: true,
                    };
                  }
                  request(options, function (error, response, body) {});
                  res.json(true);
                }
              }
            );
          }
        }
      );
    });
  } catch (err) {
    logger.log("error", err);
  }
});

router.post("/login", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      return res.json(err);
    }
    console.log(sha1(req.body.password));
    conn.query(
      "select * from users WHERE email=? AND password=? AND active = 1",
      [req.body.email, sha1(req.body.password)],
      function (err, rows, fields) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
        console.log(rows);
        if (rows.length > 0) {
          conn.end();
          const token = jwt.sign(
            {
              user: {
                id: rows[0].id,
                firstname: rows[0].firstname,
                type: rows[0].type,
                isClub: rows[0].is_club,
              },
              email: rows[0].email,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: expiresToken,
            }
          );
          logger.log(
            "info",
            `USER: ${req.body.email} is LOGIN at ${new Date().toDateString()}.`
          );
          return res.json({
            token: token,
          });
        } else {
          return res.json(false);
        }
      }
    );
  });
});

router.get("/getMe", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from users where id = ?",
          [req.user.user.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/changePassword", auth, function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    if (
      req.body.current_password == req.body.new_password ||
      req.body.new_password != req.body.repet_new_password
    ) {
      res.json(false);
    } else {
      conn.query(
        "update users SET password = ? where id = ?",
        [sha1(req.body.new_password), req.user.user.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            res.json(false);
          }
        }
      );
    }
  });
});

router.post("/changePersonalInfo", auth, function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "update users SET ? where id = ?",
      [req.body, req.user.user.id],
      function (err, rows) {
        conn.release();
        if (!err) {
          res.json(true);
        } else {
          console.log(err);
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(false);
        }
      }
    );
  });
});

/* CITIES */

router.get("/getCities", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query("select * from cities", function (err, rows, fields) {
          conn.release();
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            res.json(err);
          } else {
            res.json(rows);
          }
        });
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/createCity", auth, async function (req, res, next) {
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(err);
      }
      conn.query("insert into cities set ?", req.body, async function (err) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          return res.json(err);
        } else {
          logger.log("info", "Create new city");
          res.json(true);
        }
      });
    });
  } catch (err) {
    logger.log("error", err);
  }
});

router.post("/updateCity", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "update cities SET ? where id = ?",
        [req.body, req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/deleteCity", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "delete from cities where id = ?",
        [req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

/* END CITIES */

/* USERS */

router.get("/getUsers", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from users where type = 2",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/createUser", auth, async function (req, res, next) {
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(err);
      }
      conn.query("insert into users set ?", req.body, async function (err) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          return res.json(err);
        } else {
          logger.log("info", "Create new city");
          res.json(true);
        }
      });
    });
  } catch (err) {
    logger.log("error", err);
  }
});

router.post("/updateUser", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "update users SET ? where id = ?",
        [req.body, req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            var option_request = {
              url: process.env.link_api + "infoForActiveFreeAd",
              method: "POST",
              body: req.body,
              json: true,
            };
            request(option_request, function (error, response, body) {});

            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/deleteUser", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "delete from users where id = ?",
        [req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

/* END USERS */

/* DISTRICTS */

router.get("/getDistricts", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query("select * from districts", function (err, rows, fields) {
          conn.release();
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            res.json(err);
          } else {
            console.log(rows);
            res.json(rows);
          }
        });
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/createDistrict", auth, async function (req, res, next) {
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(err);
      }
      conn.query("insert into districts set ?", req.body, async function (err) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          return res.json(err);
        } else {
          logger.log("info", "Create new city");
          res.json(true);
        }
      });
    });
  } catch (err) {
    logger.log("error", err);
  }
});

router.post("/updateDistrict", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "update districts SET ? where id = ?",
        [req.body, req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/deleteCity", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "delete from cities where id = ?",
        [req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

/* END DISTRICTS */

router.get("/verificationMail/:email", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "update users set active = 1 where SHA1(email) = ?",
          [req.params.email],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.redirect(process.env.link_client + "login");
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/verificationMailForClub/:email", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "update users set active = 2 where SHA1(email) = ?",
          [req.params.email],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.redirect(process.env.link_client + "login");
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

/* ADS DRAFT */

router.get("/getMyAds", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from ads_draft where id_user = ?",
          req.user.user.id,
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/updateMyAds", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "update ads_draft SET ? where id = ?",
        [req.body, req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/deleteMyAds", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "delete from ads_draft where id = ?",
        [req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

/* END ADS DRAFT */

/* PAID ADS */

router.get("/getPaidAdsByUser", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select a.*, p.* from paid_ads p join ads_draft a on p.ads_draft = a.id join cities c on p.city = c.id where p.id_user = ? and p.active = 1",
          req.user.user.id,
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/createPaidAd", auth, async function (req, res, next) {
  console.log(auth);
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(err);
      }
      req.body.start_date = new Date(req.body.start_date);
      const start_date = new Date(
        JSON.parse(JSON.stringify(req.body.start_date))
      );
      req.body.number_of_weeks = 2;
      req.body.expired_date = addWeeks(start_date, req.body.number_of_weeks);
      req.body.id_user = req.user.user.id;
      conn.query(
        "insert into paid_ads set ?",
        req.body,
        async function (err, rows) {
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            return res.json(err);
          } else {
            logger.log("info", "Create request for free Ad");
            conn.query(
              "select p.*, a.name as 'ads_name', c.name as 'city_name' from paid_ads p join ads_draft a on p.ads_draft = a.id join cities c on p.city = c.id where p.id = ?",
              rows.insertId,
              function (err, rows, fields) {
                conn.release();
                if (err) {
                  logger.log("error", err.sql + ". " + err.sqlMessage);
                  res.json(err);
                } else {
                  var options = {
                    url: process.env.link_api + "sendRequestForFreeAd",
                    method: "POST",
                    body: rows[0],
                    json: true,
                  };
                  request(options, function (error, response, body) {});
                  res.json(true);
                }
              }
            );
          }
        }
      );
    });
  } catch (err) {
    logger.log("error", err);
  }
});

router.post("/createPaidAdWithoutAuth", async function (req, res, next) {
  console.log(req.body);
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(err);
      }
      req.body.start_date = new Date(req.body.start_date);
      const start_date = new Date(
        JSON.parse(JSON.stringify(req.body.start_date))
      );
      req.body.expired_date = addWeeks(start_date, req.body.number_of_weeks);
      req.body.id_user = req.body.app_token.user.id;
      delete req.body.app_token;
      delete req.body.price;
      conn.query(
        "insert into paid_ads set ?",
        req.body,
        async function (err, rows) {
          conn.release();
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            return res.json(err);
          } else {
            logger.log("info", "Paid new Ad!");
            return res.json(true);
          }
        }
      );
    });
  } catch (err) {
    logger.log("error", err);
  }
});

function addWeeks(date, weeks) {
  date.setDate(date.getDate() + 7 * weeks);
  return date;
}

router.post("/updatePaidAd", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      req.body.start_date = new Date(req.body.start_date);
      conn.query(
        "update paid_ads SET ? where id = ?",
        [req.body, req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/deleteMyAds", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "delete from cities where id = ?",
        [req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getPaidScrollAds", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from paid_ads p join ads_draft a on p.ads_draft = a.id where p.active = 1 and p.position = 2",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getPaidFixedAds", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from paid_ads p join ads_draft a on p.ads_draft = a.id where p.active = 1 and p.position = 1",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getPaidScrollAdsByCity/:id", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select distinct * from paid_ads p join ads_draft a on p.ads_draft = a.id where p.city = ? and p.active = 1 and p.position = 2",
          [req.params.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getPaidFixedAdsByCity/:id", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select distinct * from paid_ads p join ads_draft a on p.ads_draft = a.id where p.city = ? and p.active = 1 and p.position = 1",
          [req.params.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getRequestAds", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select p.*, a.*, c.name as 'city_name', u.firstname, u.email, pp.name as 'position' from paid_ads p join ads_draft a on p.ads_draft = a.id join cities c on p.city = c.id join users u on p.id_user = u.id join position_prices pp on p.position = pp.id where p.active = 0 order by p.start_date desc",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getRequestAdById/:id", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select a.*, c.name as 'city', pp.name as 'position', pp.price, p.number_of_weeks, p.start_date, p.expired_date, p.id as 'id', p.active, u.firstname, u.email from paid_ads p join ads_draft a on p.ads_draft = a.id join cities c on p.city = c.id join users u on p.id_user = u.id join position_prices pp on p.position = pp.id where p.active = 0 and p.id = ?",
          [req.params.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/getAdInformationForPayment", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from ads_draft where id = ?",
          [req.body.ads_draft],
          function (err, ad, fields) {
            if (err) {
              conn.release();
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              conn.query(
                "select * from position_prices where id = ?",
                [req.body.position],
                function (err, position, fields) {
                  console.log(position);
                  if (err) {
                    conn.release();
                    logger.log("error", err.sql + ". " + err.sqlMessage);
                    res.json(err);
                  } else {
                    conn.query(
                      "select * from cities where id = ?",
                      [req.body.city],
                      function (err, city, fields) {
                        conn.release();
                        if (err) {
                          logger.log("error", err.sql + ". " + err.sqlMessage);
                          res.json(err);
                        } else {
                          var data = ad;
                          data[0]["city"] = city[0].name;
                          data[0]["position"] = position[0].name;
                          data[0]["price"] = position[0].price;
                          data[0]["expired_date"] = addWeeks(
                            new Date(req.body.start_date),
                            req.body.number_of_weeks
                          );
                          console.log(data);
                          res.json(data);
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/activeAd", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "update paid_ads SET active = 1 where id = ?",
        [req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            var options = {
              url: process.env.link_api + "infoForActiveFreeAd",
              method: "POST",
              body: req.body,
              json: true,
            };
            request(options, function (error, response, body) {});
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/denyAd", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "update paid_ads SET active = -1 where id = ?",
        [req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            var options = {
              url: process.env.link_api + "infoForDenyFreeAd",
              method: "POST",
              body: req.body,
              json: true,
            };
            request(options, function (error, response, body) {});
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/deletePaidAd", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "delete from paid_ads where id = ?",
        [req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            var options = {
              url: process.env.link_api + "infoForActiveFreeAd",
              method: "POST",
              body: req.body,
              json: true,
            };
            request(options, function (error, response, body) {});
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getAllPaidAds", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select p.*, a.*, a.name as 'ads_name', c.name as 'city_name', pp.name as 'position_name', pp.price from paid_ads p join ads_draft a on p.ads_draft = a.id join cities c on p.city = c.id join position_prices pp on p.position = pp.id order by p.id desc",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getAllInvoices", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select p.*, a.name as 'ads_name', c.name as 'city_name', u.*, pp.price from paid_ads p join ads_draft a on p.ads_draft = a.id join cities c on p.city = c.id join users u on p.id_user = u.id join position_prices pp on p.position = pp.id where p.paid_ad = 1 order by p.id desc",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getMyInvoices", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select p.*, a.name as 'ads_name', c.name as 'city_name', u.*, pp.price from paid_ads p join ads_draft a on p.ads_draft = a.id join cities c on p.city = c.id join users u on p.id_user = u.id join position_prices pp on p.position = pp.id where p.paid_ad = 1 and p.id_user = ? order by p.id desc",
          [req.user.user.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

/* END PAID ADS */

/* POSITION PRICE */

router.get("/getPositionPrices", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from position_prices",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/createPositionPrice", auth, async function (req, res, next) {
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(err);
      }
      conn.query(
        "insert into position_prices set ?",
        req.body,
        async function (err) {
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            return res.json(err);
          } else {
            logger.log("info", "Create new city");
            res.json(true);
          }
        }
      );
    });
  } catch (err) {
    logger.log("error", err);
  }
});

router.post("/updatePositionPrice", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "update position_prices SET ? where id = ?",
        [req.body, req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/deletePositionPrice", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "delete from position_prices where id = ?",
        [req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            res.json(false);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

/* END POSITION PRICE */

router.post("/createPayment", (req, res, next) => {
  stripe.charges.create(
    {
      amount: req.body.price * 100,
      currency: "EUR",
      description: req.body.description,
      source: req.body.token.id,
    },
    (err, charge) => {
      if (err) {
        console.log(err);
        next(err);
      }

      req.body.ad_date["app_token"] = decodeToken(req.body.app_token);
      console.log("USAO SAM OVDEE!!");
      var options = {
        rejectUnauthorized: false,
        url: process.env.link_api + "createPaidAdWithoutAuth",
        method: "POST",
        body: req.body.ad_date,
        json: true,
      };
      request(options, function (error, response, body) {
        res.json(response.body);
      });
    }
  );
});

function decodeToken(token) {
  return jwt.decode(token, process.env.TOKEN_KEY, {
    expiresIn: expiresToken,
  });
}
