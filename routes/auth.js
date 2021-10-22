const express = require("express");
const router = new express.Router();
module.exports = router;
const User = require("./../models/User");
const bcrypt = require("bcrypt");

router.get("/signin", (req, res, next) => {
  res.render("auth/signin");
});
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});
router.get("/signout", (req, res, next) => {  
    req.session.destroy(function(err) {
        res.redirect("/signin")
    })
})
router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
  if (!foundUser) {
      req.flash("error", "Invalid credentials");
      res.redirect("/signin");
  } else {
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
          req.flash("error", "Invalid credentials");
          res.redirect("/signin")
      } else {
          const userObject = foundUser.toObject();
          delete userObject.password;
          req.session.currentUser = userObject;
          req.flash("success", "Successfully logged in...");
          res.redirect("/");
      }
  }
})
router.post("/signup", async (req, res, next) => {

    try {
        const newUser = {...req.body};
        const foundUser = await User.findOne({ email: newUser.email });

console.log(newUser)

        if (foundUser) {
            console.log("already found")
            req.flash("warning", "email already registered");
            res.redirect("/signin");
        } else {
            const hashedPassword = bcrypt.hashSync(newUser.password, 10);
            newUser.password = hashedPassword;
            await User.create(newUser);
            req.flash("success", "Congrats ! You are now registered !")
            res.redirect("/signin")
        }
    } catch (err) {
        console.log("err", err)
        let errorMessage = "";
        for (field in err.errors) {
          errorMessage += err.errors[field].message + "\n";
        }
        req.flash("error", errorMessage);
        res.redirect("/signup");
      }
})
module.exports = router;

