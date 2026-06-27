// const express = require("express");
// const router = express.Router();
// const func = require("./../utils/validations.js")

// // Signup Route
// router.route("/signup")
//     .get(
//         func.isLoggedOut,
//         userController.signup
//     )
//     .post(
//         func.isLoggedOut,
//         func.validateReqBody,
//         func.validateUser,
//         asyncWrap(userController.renderSignupForm)
//     )

// // Login Route
// router.route("/login")
//     .get(
//         func.isLoggedOut,
//         userController.renderLoginForm
//     )
//     .post(
//         func.isLoggedOut,
//         func.saveRedirectUrl,
//         passport.authenticate("local",{
//             failureRedirect: "/login",
//             failureFlash: true
//         }),
//         asyncWrap(userController.loginSuccess)
//     )

// // Logout
// router.get("/logout",
//     func.isLoggedIn,
//     userController.logout
// )

// module.exports = router;