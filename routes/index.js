const express = require("express");
const router = express.Router();

const SneakerModel = require('./../models/Sneaker');
const TagModel = require('./../models/Tag');
const UserModel = require('./../models/User');

const protectPrivateRoute = require('./../middlewares/protectPrivateRoute');

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res, next) => {
  const cat = req.params.cat;
  if (cat === 'collection') {
    SneakerModel.find()
    .then(sneakers => res.render('products', {sneakers}))
    .catch(next)
  } else {
    SneakerModel.find({category: cat})
    .then(sneakers => res.render('products', {sneakers}))
    .catch(next)
  }
});






// router.get("/sneakers/:cat", async (req, res, next) => {
//   const cat = req.params.cat;
//   try{
//    res.render("one_product", {
//       one_product: await SneakerModel.find()
//   });
//  } catch (err) {
//   next(err);
//  }
// });

module.exports = router;