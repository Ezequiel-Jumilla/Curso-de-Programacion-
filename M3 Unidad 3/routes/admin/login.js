var express = require("express");
const res = require("express/lib/response");
const async = require("hbs/lib/async");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("admin/login",{ layout: "admin/login" });
});

module.exports = router;
