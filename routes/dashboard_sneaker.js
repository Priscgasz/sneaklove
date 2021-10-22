const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const userModel = require("./../models/User");
const SneakerModel = require("./../models/Sneaker");

router.get("/dashboard", (req, res, next) => {
  res.render("products_manage");
});

router.get("/dashboard/add", function (req, res, next) {
  console.log("hello");
  res.render("products_add.hbs");
});
//   .create(req.body)
// //       .then((celebrities) => res.redirect("/celebrities"))
// //       .catch(() => res.render("/celebrities/new-celebrity"));
// //   });
router.post("/dashboard/add", function (req, res, next) {
    console.log(req.body)
  SneakerModel.create(req.body)
    .then(() => res.redirect("/dashboard"))
    .catch(() => res.redirect('/dashboard/add'))
});
//

router.get("/sneakers/:cat/:id", function (req, res, next) {
  SneakerModel.findById(req.params.id)
    .then((sneaker) => res.render("one_product.hbs", { sneaker }))
    .catch(next);
});

router.get("/delete/:id"),
  (req, res, next) => {
    SneakerModel.findByIdAndRemove(req.params.id)
      .then(() => res.redirect("/sneakers"))
      .catch(next);
  };

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
