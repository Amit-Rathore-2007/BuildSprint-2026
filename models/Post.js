const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    title: String,
    description: String,
    category: String,

    hashtags: [String],

    images: [String],

    location: String,

    participants: {
        type: Number,
        default: 1
    },

    maxParticipants: Number,

    expiry: Date,

    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }

}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);