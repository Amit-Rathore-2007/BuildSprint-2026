const { required } = require("joi");
const mongoose = require("mongoose");
const { type } = require("node:os");

const complaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: [
        {
            _id: false,
            url: String,
            filename: String,
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

const Complaint = mongoose.model("Complaint" , complaintSchema);

module.exports = Complaint;