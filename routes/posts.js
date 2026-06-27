const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const upload = require("../middlewares/upload");

/* =========================
   CREATE POST
========================= */

router.post("/create", upload.array("images", 5), async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            location,
            maxParticipants,
            expiry,
            hashtags
        } = req.body;

        // convert hashtags string → array
        const hashtagArray = hashtags
            ? hashtags.split(" ").filter(tag => tag.startsWith("#"))
            : ["#campusbuzz"];

        // images from multer
        const imagePaths = req.files
            ? req.files.map(file => "/uploads/" + file.filename)
            : [];

        const newPost = new Post({
            author: req.user?._id, // if passport used
            title,
            description,
            category,
            location,
            maxParticipants,
            expiry,
            hashtags: hashtagArray,
            images: imagePaths
        });

        await newPost.save();

        res.status(201).json({
            success: true,
            post: newPost
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
});

/* =========================
   GET ALL POSTS (FEED)
========================= */

router.get("/feed", async (req, res) => {
    try {

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .limit(50);

        res.json(posts);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;