const express = require("express");
const router = express.Router();
const func = require("./../utils/validations.js");
const multer = require("multer");
const { storage } = require("./../cloudConfig.js")
const upload = multer({ storage })
const Complaint = require("./../models/complaint.js")

router.route("/")
    .get(
        (req,res,next) => {
            if (req.user)
                res.render("./main/home.ejs", {currActive : "feed"})
            else
                res.render("./main/landing.ejs")
        }
    )

router.route("/feed")
    .get(
        func.isLoggedIn,
        (req,res,next) => {
            res.render("./main/home.ejs", {currActive : "feed"})
        }
    )

router.route("/club-committee")
    .get(
        func.isLoggedIn,
        (req,res,next) => {
        res.render("./main/club-committee.ejs", {currActive : "club-committee"})
    })

router.route("/event-calander")
    .get(
        func.isLoggedIn,
        (req,res,next) => {
        res.render("./main/event-calander.ejs", {currActive : "event-calander"})
    })

router.route("/complaint")
    .get(
        func.isLoggedIn,
        (req,res,next) => {
        res.render("./main/complaint.ejs", {currActive : "complaint"})
    })
    .post(
        func.isLoggedIn,
        upload.array("complaint[image]",8),
        async (req,res,next) => {
            image=[];
            for (i of req.files) {
                image.push({ url: i.path, filename: i.filename });
            }

            req.body.complaint.image = image;
            req.body.complaint.owner = req.user._id
            let post = new Complaint(req.body.complaint);
            console.log(post)
            await post.save();
            res.redirect("/complaint");
        }
    )

module.exports = router;