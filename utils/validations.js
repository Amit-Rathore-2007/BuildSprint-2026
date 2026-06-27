const express = require("express");
const ExpressError = require("../ExpressError.js");
const asyncWrap = require("./asyncWrap.js");

module.exports = {
    validateReqBody: async (req,res,next) => {
        console.log(req.body)
        if (typeof req.body == 'undefined' || req.body=={}) {
            throw new ExpressError(`Invalid Data!`,404);
        } else
            next();
    },

    validateUser: (req,res,next) => {
        let {error} = userSchema.validate(req.body);
        if (error){
            console.log(error)
            let errMsg = error.details.map(el => el.message).join(" , ");
            req.flash("error",errMsg);
            res.redirect(req.get("Referer"));
        } else
            next();
    },

    isLoggedIn: (req,res,next) => {
        if (!req.isAuthenticated()) {
            req.flash("error","Login Required!");
            console.log("error")
            res.redirect("/");
        } else
            next();
    },

    isLoggedOut: (req,res,next) => {
        if (req.isAuthenticated()) {
            console.log("You must be Log out, to Login with another account!")
            req.flash("error","You must be Log out, to Login with another account!");
            res.redirect("/");
        } else
            next();
    },
}