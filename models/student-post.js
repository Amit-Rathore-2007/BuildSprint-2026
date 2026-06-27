const { required } = require("joi");
const mongoose = require("mongoose");
const { type } = require("node:os");

const studentPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [
        {
            _id: false,
            url: String,
            filename: String,
        },
    ],
    expiry: {
        type: Date,
        default: Date.now() + 24 * 60 * 60 * 1000,
    },
    createdAt : {
        type: Date,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

const studentPost = mongoose.model("User" , studentPostSchema);

module.exports = studentPost;