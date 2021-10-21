const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const userModel = require('./../models/User')

// router.get("/add", function (req, res, next) {
//     res.render("products_add.hbs");
//   });

router.get("/sneakers/add", function (req, res, next) {
    res.render("products_add.hbs");
  });

router.post("/sneakers/add", async (req, res, next) => {
    try {
      console.log(req.body);
      await userModel.create(req.body);
      res.redirect("/sneakers/collection");
      console.log(sneakers)
    } catch (err) {
      next(err);
      res.render("/products_add.hbs");
    }
  });

module.exports = router;
