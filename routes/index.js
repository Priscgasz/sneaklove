const express = require("express");
const router = express.Router();
const sneakerModel = require('./../models/Sneaker')
const tagModel = require('./../models/Tag')
const userModel = require('./../models/User')

// return console.log(`\n\n
// -----------------------------
// -----------------------------
//      wax on / wax off !
// -----------------------------
// -----------------------------\n\n`
// );

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res, next) => {
  const cat = req.params.cat;
  if (cat === 'collection') {
    sneakerModel.find()
    .then(sneakers => res.render('products', { sneakers }))
    .catch(next)
  } else {
    sneakerModel.find({ category: cat })
    .then(sneakers => res.render('products', { sneakers }))
    .catch(next)
  }
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});


module.exports = router;