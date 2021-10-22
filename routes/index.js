const express = require("express");
const router = express.Router();

const SneakerModel = require('./../models/Sneaker');
const TagModel = require('./../models/Tag');
const UserModel = require('./../models/User');

const protectPrivateRoute = require('./../middlewares/protectPrivateRoute');

// return console.log(`\n\n
// -----------------------------
// -----------------------------
//      wax on / wax off !
// -----------------------------
// -----------------------------\n\n`
// );

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

router.get("/sneakers/:cat/:id", function (req, res, next) {
  SneakerModel.findById(req.params.id)
   .then((sneaker) => res.render("one_product.hbs", { sneaker }))
   .catch(next);
});


router.get("/sneakers/add", function (req, res, next) {
  res.render("product_add.hbs");
});

router.post("/sneakers/add", async function (req, res, next) {
try {
  await SneakerModel.create({
    ...req.body, 
  }),
 res.redirect("/sneakers");
} catch (err) {
  next(err);
}
});

router.get("/delete/:id"), (req, res, next) => {
  SneakerModel.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/sneakers"))
    .catch(next);
};

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