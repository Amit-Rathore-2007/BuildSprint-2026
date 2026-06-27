const express = require("express");
const router = express.Router();
const func = require("./../utils/validations.js");
const passport = require("passport");
const User = require("./../models/user.js")

router.post("/signup",
        func.isLoggedOut,
        async (req,res,next) => {
            let { email, username, pass } = req.body;
            let newUser = new User({ email, username });
            const regUser = await User.register(newUser, pass);
            console.log(regUser);
            req.login(regUser, err => {
                if (err)
                    return next(err);
                req.flash("success",`Welcome to WonderLust!`)
                res.redirect("/");
            })
        }
    )


router.route("/login")
    .get(
        func.isLoggedOut,
        (req,res,next) => {
            res.render("./authentication/login.ejs");
        }
    )
    .post(
        func.isLoggedOut,
        func.validateReqBody,
        passport.authenticate("local",{
            failureRedirect: "/auth/login",
            failureFlash: true
        }),
        (req,res,next) => {
            res.redirect("/")
        }
    )

router.route("/logout")
    .get(
        func.isLoggedIn,
        (req,res,next) => {
            res.redirect("/");
        }
    )

module.exports = router;