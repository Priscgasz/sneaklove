const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const userModel = require("./../models/User");
const SneakerModel = require("./../models/Sneaker");
const uploader = require('../config/cloudinary.js')

router.get("/dashboard", (req, res, next) => {
    SneakerModel.find()
    .then(sneakers => res.render('products_manage', {sneakers}))
    .catch(err => next(err))
});



router.get("/dashboard/add", function (req, res, next) {
  console.log("hello");
  res.render("products_add.hbs");
});
//   .create(req.body)
// //       .then((celebrities) => res.redirect("/celebrities"))
// //       .catch(() => res.render("/celebrities/new-celebrity"));
// //   });
router.post("/dashboard/add", uploader.single('image') ,function (req, res, next) {
    const newSneaker = req.body
    if (!req.file) newSneaker.image = null
    else {
        console.log(req.file.path)
        newSneaker.image = req.file.path
    }
  SneakerModel.create(newSneaker)
    .then(() => res.redirect("/dashboard"))
    .catch((err) => {
        console.log(err)
        res.redirect('/dashboard/add')})
});
//

router.get("/sneakers/:cat/:id", function (req, res, next) {
  SneakerModel.findById(req.params.id)
    .then((sneaker) => res.render("one_product.hbs", { sneaker }))
    .catch(next);
});

router.get("/dashboard/delete/:id", (req, res, next) => {
    SneakerModel.findByIdAndRemove(req.params.id)
      .then(() => res.redirect("/dashboard"))
      .catch(next);
})

router.get('/dashboard/product-edit/:id', (req, res, next) => {
    SneakerModel.findById(req.params.id)
    .then((sneaker) => {
        res.render('product_edit', {sneaker})
    })
    .catch(err => next(err))
})

router.post('/dashboard/edit/:id', (req, res, next) => {
    SneakerModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.redirect('/dashboard')
    })
    .catch(() => res.redirect('/dashboard/product-edit/' + req.params.id))
})
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
