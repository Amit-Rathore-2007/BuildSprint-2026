const { required } = require("joi");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    coll_roll_no: {
        type: Number,
        required: true,
    },
    coll_branch: {
        type: String,
        required: true
    },
    coll_joined_year : {
        type: Date,
        required: true
    },
    coll_email: {
        type: String,
        required: true,
        set: v => v.toLowerCase(),
    },
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User" , userSchema);

module.exports = User;