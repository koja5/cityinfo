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

/* GET api listing. */
router.get("/", (req, res) => {
  // res.send("api works");
});

router.post("/signUp", async function (req, res, next) {
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(false);
      }
      conn.query(
        "select * from users where email = ?",
        [req.body.email],
        async function (err, rows, fields) {
          if (err) {
            conn.release();
            logger.log("error", err.sql + ". " + err.sqlMessage);
            return res.json(false);
          }
          if (rows.length > 0) {
            conn.release();
            res.json(false);
          } else {
            req.body.password = sha1(req.body.password);
            req.body.type = 2;
            conn.query(
              "insert into users set ?",
              req.body,
              async function (err) {
                conn.release();
                if (err) {
                  logger.log("error", err.sql + ". " + err.sqlMessage);
                  return res.json(false);
                } else {
                  logger.log("info", "New user create account!");
                  if (req.body.is_club) {
                    var options = {
                      rejectUnauthorized: false,
                      url:
                        process.env.link_api + "verificationMailAddressForClub",
                      method: "POST",
                      body: { email: req.body.email },
                      json: true,
                    };

                    var option_request = {
                      rejectUnauthorized: false,
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
                      rejectUnauthorized: false,
                      url: process.env.link_api + "verificationMailAddress",
                      method: "POST",
                      body: { email: req.body.email },
                      json: true,
                    };
                  }
                  request(options, function (error, response, body) {
                    console.log(error);
                  });

                  var option_request = {
                    rejectUnauthorized: false,
                    url:
                      process.env.link_api +
                      "sendInfoForNewCreatedCompanyAccount",
                    method: "POST",
                    body: req.body,
                    json: true,
                  };

                  request(option_request, function (error, response, body) {});
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
      return res.json(false);
    }
    conn.query(
      "select * from users WHERE email=? AND password=? AND active = 1",
      [req.body.email, sha1(req.body.password)],
      function (err, rows, fields) {
        conn.release();
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        }
        if (rows.length > 0) {
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
          logger.log(
            "error",
            `USER: ${
              req.body.email
            } is NOT AUTHORIZED at ${new Date().toDateString()}.`
          );
          return res.json(false);
        }
      }
    );
  });
});

router.get("/activeUser/:email", function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "update users SET active = 1 where sha1(email) = ?",
        [req.params.email],
        function (err, rows) {
          if (!err) {
            conn.query(
              "select * from users where sha1(email) = ?",
              [req.params.email],
              function (err, rows) {
                conn.release();
                var option_request = {
                  rejectUnauthorized: false,
                  url: process.env.link_api + "infoApprovedAccountFromAdmin",
                  method: "POST",
                  body: rows[0],
                  json: true,
                };
                request(option_request, function (error, response, body) {});
                return res.redirect("/");
              }
            );
          } else {
            conn.release();
            return res.redirect("/message/error");
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/deactiveUser/:email", function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "update users SET active = 0 where sha1(email) = ?",
        [req.params.email],
        function (err, rows) {
          if (!err) {
            conn.query(
              "select * from users where sha1(email) = ?",
              [req.params.email],
              function (err, rows) {
                conn.release();
                var option_request = {
                  rejectUnauthorized: false,
                  url:
                    process.env.link_api + "infoDeactiveClubAccountFromAdmin",
                  method: "POST",
                  body: rows[0],
                  json: true,
                };
                request(option_request, function (error, response, body) {});
                return res.redirect("/");
              }
            );
          } else {
            conn.release();
            return res.redirect("/message/error");
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/recoveryPassword", function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "update users SET password = ? where sha1(email) = ?",
      [sha1(req.body.password), req.body.email],
      function (err, rows) {
        conn.release();
        if (!err) {
          res.json(true);
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
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
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(false);
        }
      }
    );
  });
});

/* CITIES */

router.get("/getCities/:search?", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        if (!req.params.search || req.params.search === "") {
          conn.query(
            "select * from cities order by name asc LIMIT 0, 10",
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
        } else {
          console.log(req.params.search);
          conn.query(
            "select * from cities where name like '" +
              req.params.search +
              "%' order by name asc",
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
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getCityIdFromName/:name", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select id from cities c where c.name = ?",
          req.params.name,
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows[0]);
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

router.post("/createCity", auth, async function (req, res, next) {
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(false);
      }
      conn.query("insert into cities set ?", req.body, async function (err) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          return res.json(false);
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

/* CATEGORIES */

router.get("/getCategories", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from categories order by sequence asc",
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

router.post("/createCategory", auth, async function (req, res, next) {
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(false);
      }
      conn.query(
        "insert into categories set ?",
        req.body,
        async function (err) {
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            return res.json(false);
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

router.post("/updateCategory", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "update categories SET ? where id = ?",
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

router.post("/deleteCategory", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "delete from categories where id = ?",
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
        return res.json(false);
      }
      conn.query("insert into users set ?", req.body, async function (err) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          return res.json(false);
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
              rejectUnauthorized: false,
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
        return res.json(false);
      }
      conn.query("insert into districts set ?", req.body, async function (err) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          return res.json(false);
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

/* ADS DRAFT */

router.get("/getAllAdsDraft", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query("select * from ads_draft", function (err, rows, fields) {
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

router.get("/getMyAds", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from ads_draft where id_user = ? order by name asc",
          req.user.user.id,
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

router.post("/createMyAds", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      if (req.body.category) {
        req.body.category = req.body.category.toString();
      }
      req.body.id_user = req.user.user.id;
      conn.query(
        "insert into ads_draft SET ?",
        [req.body],
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

router.post("/updateMyAds", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      if (req.body.category) {
        req.body.category = req.body.category.toString();
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

/* EVENTS DRAFT */

router.get("/getEventsDraft", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from events_draft where id_user = ? order by name asc",
          req.user.user.id,
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

router.get("/getAllEventsDraft", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query("select * from events_draft", function (err, rows, fields) {
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

router.post("/createEventDraft", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      if (req.body.category) {
        req.body.category = req.body.category.toString();
      }
      req.body.id_user = req.user.user.id;
      conn.query(
        "insert into events_draft SET ?",
        [req.body],
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

router.post("/updateEventDraft", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      if (req.body.category) {
        req.body.category = req.body.category.toString();
      }
      conn.query(
        "update events_draft SET ? where id = ?",
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

router.post("/deleteEventDraft", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "delete from events_draft where id = ?",
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

router.post("/updatePaidEventActive", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }

      conn.query(
        "update paid_events SET active = ? where id = ?",
        [req.body.active, req.body.id],
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

router.post("/updatePaidEvent", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }

      req.body.datetime = convertToDate(req.body.datetime);
      if (req.body.start_date_top) {
        req.body.start_date_top = convertToDate(req.body.start_date_top);
      }

      conn.query(
        "update paid_events SET ? where id = ?",
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

router.post("/updatePaidEventToActive", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }

      conn.query(
        "update paid_events SET active = ? where id = ?",
        [req.body.active, req.body.id],
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

/* END EVENTS DRAFT */

/* PLACES */

router.get("/getAllPlaces", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select p.*, c.name as city_name, u.firstname, u.lastname, u.nameOfOrganization, u.email as 'client_email', u.phone as 'client_phone', u.mobile as 'client_mobile' from places p join cities c on p.city = c.id join users u on p.id_user = u.id",
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

router.get("/getPlaceById/:id", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select p.*, c.name as city_name, u.firstname, u.lastname, u.nameOfOrganization, u.email as 'client_email', u.phone as 'client_phone', u.mobile as 'client_mobile' from places p join cities c on p.city = c.id join users u on p.id_user = u.id where p.id = ?",
          req.params.id,
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

router.get("/getMyPlaces", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select p.*, c.name as 'city_name' from places p join cities c on p.city = c.id where id_user = ? order by p.name asc",
          req.user.user.id,
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

router.post("/createPlace", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }

      if (req.body.category) {
        req.body.category = req.body.category.toString();
      }
      req.body.id_user = req.user.user.id;
      delete req.body.city_name;
      conn.query("insert into places SET ?", [req.body], function (err, rows) {
        if (!err) {
          conn.query(
            "select p.*, c.name as 'city_name' from places p join cities c on p.city = c.id where p.id = ?",
            [rows.insertId],
            function (err, place) {
              conn.release();
              if (!err) {
                var option_request = {
                  rejectUnauthorized: false,
                  url: process.env.link_api + "sendRequestToCheckPlace",
                  method: "POST",
                  body: place[0],
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
        } else {
          conn.release();
          logger.log("error", `${err.sql}. ${err.sqlMessage}`);
          res.json(false);
        }
      });
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/updatePlace", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }

      if (req.body.category) {
        req.body.category = req.body.category.toString();
      }
      const place = JSON.parse(JSON.stringify(req.body));
      delete req.body.city_name;

      conn.query(
        "update places SET ? where id = ?",
        [req.body, req.body.id],
        function (err, rows) {
          if (!err) {
            var option_request = {
              rejectUnauthorized: false,
              url: process.env.link_api + "sendRequestToCheckPlaceUpdate",
              method: "POST",
              body: place,
              json: true,
            };
            request(option_request, function (error, response, body) {});
            res.json(true);
          } else {
            logger.log("error", `${err.sql}. ${err.sqlMessage}`);
            conn.release();
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

router.post("/updatePlaceActive", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "update places SET active = ? where id = ?",
        [req.body.active, req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            var option_request = {
              rejectUnauthorized: false,
              url: process.env.link_api + "sendRequestToCheckPlaceUpdate",
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

router.post("/deletePlace", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "delete from places where id = ?",
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

router.get("/getPlacesByCity/:id", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select p.*, c.name as 'city_name' from places p join cities c on p.city = c.id where c.id = ? and p.active = 1",
          req.params.id,
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

router.get("/getPlacesForAllCity", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select p.*, c.name as 'city_name' from places p join cities c on p.city = c.id where p.active = 1  LIMIT 0, 8",
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

router.get("/activePlace/:id/:customText", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "update places SET active = 1 where id = ?",
          req.params.id,
          function (err, rows, fields) {
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              conn.query(
                "select p.*, c.name as 'city_name', u.firstname, u.email as 'user_email' from places p join cities c on p.city = c.id join users u on p.id_user = u.id where p.id = ?",
                req.params.id,
                function (err, rows, fields) {
                  conn.release();
                  if (err) {
                    logger.log("error", err.sql + ". " + err.sqlMessage);
                    res.json(err);
                  } else {
                    console.log(rows[0]);
                    rows[0]["customText"] = req.params.customText;
                    var options = {
                      rejectUnauthorized: false,
                      url: process.env.link_api + "sendInfoToCustomerForPlace",
                      method: "POST",
                      body: rows[0],
                      json: true,
                    };
                    request(options, function (error, response, body) {});
                    res.redirect(process.env.link_client + "message/success");
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

router.get("/deactivePlace/:id/:customText", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "update places SET active = 0 where id = ?",
          req.params.id,
          function (err, rows, fields) {
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              conn.release();
              res.json(err);
            } else {
              conn.query(
                "select p.*, c.name as 'city_name', u.firstname, u.email as 'user_email' from places p join cities c on p.city = c.id join users u on p.id_user = u.id where p.id = ?",
                req.params.id,
                function (err, rows, fields) {
                  conn.release();
                  if (err) {
                    logger.log("error", err.sql + ". " + err.sqlMessage);
                    res.json(err);
                  } else {
                    console.log(rows[0]);
                    rows[0]["customText"] = req.params.customText;
                    var options = {
                      rejectUnauthorized: false,
                      url: process.env.link_api + "sendInfoToCustomerForPlace",
                      method: "POST",
                      body: rows[0],
                      json: true,
                    };
                    request(options, function (error, response, body) {});
                    res.redirect(process.env.link_client + "message/success");
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

/* END PLACES */

/* PAID ADS */

router.get("/getPaidAdsByUser", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select a.*, p.*, c.name as city_name from paid_ads p join ads_draft a on p.ads_draft = a.id join cities c on p.city = c.id where p.id_user = ? order by p.start_date desc",
          req.user.user.id,
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

router.post("/createPaidAd", auth, async function (req, res, next) {
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(false);
      }
      req.body.start_date = new Date(req.body.start_date);
      const start_date = new Date(
        JSON.parse(JSON.stringify(req.body.start_date))
      );
      req.body.expired_date = addWeeks(start_date, req.body.number_of_weeks);
      req.body.id_user = req.user.user.id;
      if (req.body.id) {
        delete req.body.id;
      }
      conn.query(
        "insert into paid_ads set ?",
        req.body,
        async function (err, rows) {
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            return res.json(false);
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
                    rejectUnauthorized: false,
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
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(false);
      }
      req.body.start_date = new Date(req.body.start_date);
      const start_date = new Date(
        JSON.parse(JSON.stringify(req.body.start_date))
      );
      req.body.expired_date = addWeeks(start_date, req.body.number_of_weeks);
      req.body.id_user = req.body.app_token.user.id;
      delete req.body.app_token;
      delete req.body.price;
      if (req.body.id) {
        delete req.body.id;
      }
      conn.query(
        "insert into paid_ads set ?",
        req.body,
        async function (err, rows) {
          conn.release();
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            return res.json(false);
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

router.post("/updatePaidAdWithoutAuth", async function (req, res, next) {
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(false);
      }
      req.body.start_date = new Date(req.body.start_date);
      const start_date = new Date(
        JSON.parse(JSON.stringify(req.body.start_date))
      );
      req.body.expired_date = addWeeks(start_date, req.body.number_of_weeks);
      req.body.id_user = req.body.app_token.user.id;
      req.body.position = 1;
      delete req.body.app_token;
      conn.query(
        "update paid_ads set ? where id = ?",
        [req.body, req.body.id],
        async function (err, rows) {
          conn.release();
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            return res.json(false);
          } else {
            logger.log("info", "Paid new for CURRENT EVENT!");
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

router.post("/updatePaidAdActive", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      req.body.start_date = new Date(req.body.start_date);
      conn.query(
        "update paid_ads SET active = ? where id = ?",
        [req.body.active, req.body.id],
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

router.get("/getPaidAdsForAllCity", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select distinct a.name, a.cover, a.address, a.map_link, a.phone, a.email, a.description, p.position, p.expired_date, p.start_date, c.name as city_name, c.name as city_name from paid_ads p join ads_draft a on p.ads_draft = a.id join cities c on p.city = c.id where p.active = 1 and p.expired_date >= now() order by p.position asc, p.start_date asc",
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

router.get("/getPaidAdsByCity/:id", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select distinct a.name, a.cover, a.address, a.map_link, a.phone, a.email, a.description, p.position, p.expired_date, p.start_date, c.name as city_name from paid_ads p join ads_draft a on p.ads_draft = a.id join cities c on p.city = c.id where p.city = ? and p.active = 1 and p.expired_date >= now() order by p.position asc, p.start_date asc",
          [req.params.id],
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
              rejectUnauthorized: false,
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
              rejectUnauthorized: false,
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
              rejectUnauthorized: false,
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
          "select p.*, a.cover, a.address, a.map_link, a.phone, a.email, a.description , a.name as 'ads_name', c.name as 'city_name', pp.name as 'position_name', pp.price, u.firstname, u.lastname, u.nameOfOrganization, u.email as 'client_email', u.phone as 'client_phone', u.mobile as 'client_mobile' from paid_ads p join ads_draft a on p.ads_draft = a.id join cities c on p.city = c.id join position_prices pp on p.position = pp.id join users u on a.id_user = u.id order by p.id desc",
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

/* PAID EVENTS */

router.get("/getPaidEventsByUser", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select e.*, p.*, c.name as city_name from paid_events p join events_draft e on p.event_draft = e.id join cities c on p.city = c.id where p.id_user = ? order by p.datetime desc",
          req.user.user.id,
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

router.post("/createPaidEvent", auth, async function (req, res, next) {
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(false);
      }
      req.body.datetime = new Date(req.body.datetime);
      req.body.id_user = req.user.user.id;
      conn.query(
        "insert into paid_events set ?",
        req.body,
        async function (err, rows) {
          conn.release();
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            return res.json(false);
          } else {
            logger.log("info", "Create new events!");
            return res.json(true);
          }
        }
      );
    });
  } catch (err) {
    logger.log("error", err);
  }
});

router.get("/getAllPaidEvents", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select e.*, p.*, e.name as 'event_name', c.name as 'city_name', u.firstname, u.lastname, u.nameOfOrganization, u.email as 'client_email', u.phone as 'client_phone', u.mobile as 'client_mobile' from paid_events p join events_draft e on p.event_draft = e.id join cities c on p.city = c.id join users u on e.id_user = u.id order by p.id desc",
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

router.post("/deletePaidEvent", auth, function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "delete from paid_events where id = ?",
        [req.body.id],
        function (err, rows) {
          conn.release();
          if (!err) {
            // var options = {
            //   url: process.env.link_api + "infoForActiveFreeAd",
            //   method: "POST",
            //   body: req.body,
            //   json: true,
            // };
            // request(options, function (error, response, body) {});
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

router.get("/getPaidScrollEventsByCity/:id", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select distinct *, c.name as city_name from paid_events p join events_draft e on p.event_draft = e.id join cities c on p.city = c.id where p.city = ? and p.active = 1 and p.start_date > now() and p.expired_date is null order by p.datetime asc",
          [req.params.id],
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

router.get("/getPaidEventsForAllCity", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select distinct e.name, e.cover, e.address, e.map_link, e.phone, e.email, e.description, p.position, p.expired_date, p.datetime, c.name as city_name, c.name as city_name from paid_events p join events_draft e on p.event_draft = e.id join cities c on p.city = c.id where p.active = 1 and p.datetime >= now() order by p.position asc, p.datetime asc, p.expired_date desc",
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

router.get("/getPaidEventsByCity/:id", async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select distinct e.name, e.cover, e.address, e.map_link, e.phone, e.email, e.description, p.position, p.expired_date, p.datetime, c.name as city_name from paid_events p join events_draft e on p.event_draft = e.id join cities c on p.city = c.id where p.city = ? and p.active = 1 and p.datetime >= now() order by p.position asc, p.datetime asc, p.expired_date desc",
          [req.params.id],
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

router.post("/getEventInformationForPayment", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from events_draft where id = ?",
          [req.body.event_draft],
          function (err, event, fields) {
            if (err) {
              conn.release();
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              conn.query(
                "select * from position_prices where id = 1",
                function (err, position, fields) {
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
                          var data = event;
                          data[0]["city"] = city[0].name;
                          data[0]["position"] = position[0].name;
                          data[0]["price"] = position[0].price;
                          data[0]["expired_date"] = addWeeks(
                            new Date(req.body.start_date),
                            req.body.number_of_weeks
                          );
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

router.post("/createPaidEventWithoutAuth", async function (req, res, next) {
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(false);
      }
      req.body.id_user = req.body.app_token.user.id;
      req.body.datetime = new Date(req.body.datetime);
      if (req.body.start_date_top) {
        req.body.start_date_top = new Date(req.body.start_date_top);
        const expired_date = new Date(
          JSON.parse(JSON.stringify(req.body.start_date_top))
        );
        req.body.expired_date = addWeeks(
          expired_date,
          req.body.number_of_weeks
        );
      }
      delete req.body.app_token;
      delete req.body.price;
      if (req.body.id) {
        delete req.body.id;
      }
      conn.query(
        "insert into paid_events set ?",
        req.body,
        async function (err, rows) {
          conn.release();
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            return res.json(false);
          } else {
            logger.log("info", "Paid new Event!");
            return res.json(true);
          }
        }
      );
    });
  } catch (err) {
    logger.log("error", err);
  }
});

router.post("/updatePaidEventWithoutAuth", async function (req, res, next) {
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(false);
      }
      req.body.start_date_top = convertToDate(req.body.start_date_top);
      const start_date_top = convertToDate(
        JSON.parse(JSON.stringify(req.body.start_date_top))
      );
      req.body.expired_date = addWeeks(
        start_date_top,
        req.body.number_of_weeks
      );
      req.body.datetime = convertToDate(req.body.datetime);
      req.body.id_user = req.body.app_token.user.id;
      delete req.body.app_token;
      conn.query(
        "update paid_events set ?, position = 1 where id = ?",
        [req.body, req.body.id],
        async function (err, rows) {
          conn.release();
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            return res.json(false);
          } else {
            logger.log("info", "Paid new for CURRENT EVENT!");
            return res.json(true);
          }
        }
      );
    });
  } catch (err) {
    logger.log("error", err);
  }
});

router.post("/cancelPromotionForEvent", async function (req, res, next) {
  try {
    connection.getConnection(async function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        return res.json(false);
      }
      conn.query(
        "update paid_events set start_date_top = NULL, number_of_weeks = NULL, expired_date = NULL, position = 2 where id = ?",
        req.body.id,
        async function (err, rows) {
          conn.release();
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            return res.json(false);
          } else {
            return res.json(true);
          }
        }
      );
    });
  } catch (err) {
    logger.log("error", err);
  }
});

/* END PAID EVENTS */

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
        return res.json(false);
      }
      conn.query(
        "insert into position_prices set ?",
        req.body,
        async function (err) {
          if (err) {
            logger.log("error", err.sql + ". " + err.sqlMessage);
            return res.json(false);
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

router.post("/createAdPayment", (req, res, next) => {
  stripe.charges.create(
    {
      amount: req.body.price * 100,
      currency: "EUR",
      description: req.body.description,
      source: req.body.token.id,
    },
    (err, charge) => {
      if (err) {
        next(err);
      }

      req.body.ad_date["app_token"] = decodeToken(req.body.app_token);

      let typeOfMethod = "";
      if (req.body.action_type == 1) {
        typeOfMethod = "createPaidAdWithoutAuth";
      } else {
        typeOfMethod = "updatePaidAdWithoutAuth";
      }

      var options = {
        rejectUnauthorized: false,
        url: process.env.link_api + typeOfMethod,
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

router.post("/createEventPayment", (req, res, next) => {
  stripe.charges.create(
    {
      amount: req.body.price * 100,
      currency: "EUR",
      description: req.body.description,
      source: req.body.token.id,
    },
    (err, charge) => {
      if (err) {
        next(err);
      }
      req.body.event_date["app_token"] = decodeToken(req.body.app_token);
      let typeOfMethod = "";
      if (req.body.action_type == 1) {
        typeOfMethod = "createPaidEventWithoutAuth";
      } else {
        typeOfMethod = "updatePaidEventWithoutAuth";
      }

      var options = {
        rejectUnauthorized: false,
        url: process.env.link_api + typeOfMethod,
        method: "POST",
        body: req.body.event_date,
        json: true,
      };
      request(options, function (error, response, body) {
        res.json(response.body);
      });
    }
  );
});

router.post("/calculateRange", function (req, res, next) {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query("select * from cities", function (err, cities) {
        let items = [];
        if (!err) {
          cities.forEach(function (item, i, array) {
            if (
              calculateRange(
                req.body.lat,
                req.body.lng,
                item.lat,
                item.lng,
                req.body.range
              )
            ) {
              items.push(item);
            }
          });
          getPaidEventsForListOfCities(items, res, conn);
        } else {
          logger.log("error", `${err.sql}. ${err.sqlMessage}`);
          res.json(false);
        }
      });
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

function decodeToken(token) {
  return jwt.decode(token, process.env.TOKEN_KEY, {
    expiresIn: expiresToken,
  });
}

function convertToDate(date) {
  return new Date(date);
}

function calculateRange(lat1, lon1, lat2, lon2, range) {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in
  if (d / 1000 <= range) {
    return true;
  }
}

function getPaidEventsForListOfCities(cities, res, conn) {
  let events = [];
  let differentConditionCity = "and ";
  let differentConditionCityForPlace = "and ";
  cities.forEach(function (item, i, array) {
    differentConditionCity += "p.city = " + item.id;
    differentConditionCityForPlace += "c.id = " + item.id;
    if (i < cities.length - 1) {
      differentConditionCity += " or ";
      differentConditionCityForPlace += " or ";
    }
  });
  conn.query(
    "select distinct a.name, a.cover, a.address, a.map_link, a.phone, a.email, a.description, p.position, p.expired_date, p.start_date, c.name as city_name from paid_ads p join ads_draft a on p.ads_draft = a.id join cities c on p.city = c.id where p.active = 1 and p.expired_date >= now()" +
      differentConditionCity +
      " order by p.position asc, p.start_date asc",
    function (err, ads, fields) {
      if (err) {
        return false;
      } else {
        conn.query(
          "select distinct e.name, e.cover, e.address, e.map_link, e.phone, e.email, e.description, p.position, p.expired_date, p.datetime, c.name as city_name from paid_events p join events_draft e on p.event_draft = e.id join cities c on p.city = c.id where p.active = 1 and p.datetime >= now() " +
            differentConditionCity +
            " order by p.position asc, p.datetime asc, p.expired_date desc",
          function (err, events, fields) {
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              conn.query(
                "select p.*, c.name as 'city_name' from places p join cities c on p.city = c.id where p.active = 1 " +
                  differentConditionCityForPlace,
                function (err, places, fields) {
                  conn.release();
                  if (err) {
                    logger.log("error", err.sql + ". " + err.sqlMessage);
                    res.json(err);
                  } else {
                    const body = {
                      ads: ads,
                      events: events,
                      places: places,
                    };
                    console.log(body);
                    res.json(body);
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
