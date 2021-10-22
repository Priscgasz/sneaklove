const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const userModel = require('./../models/User')

// const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");

// router.get("/create", function (req, res, next) {
//     res.render("products_add.hbs");
//   });

// router.post("/create", async (req, res, next) => {
//     try {
//      res.redirect("/sneakers/collection");
//       await userModel.create(req.body);
 
//     } catch (err) {
//       next(err);
//     }
//   });

module.exports = router;
