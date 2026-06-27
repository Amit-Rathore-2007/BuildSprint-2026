const Joi = require("joi");

const userSchema = Joi.object({
    username: Joi.string()
        .required(),

    password: Joi.string()
        .required(),

    name: Joi.string()
        .trim()
        .required(),

    gender: Joi.string()
        .trim()
        .required(),

    age: Joi.number()
        .integer()
        .required(),

    role: Joi.string()
        .trim()
        .required(),

    contact: Joi.number()
        .integer()
        .required(),

    coll_roll_no: Joi.number()
        .integer()
        .required(),

    coll_branch: Joi.string()
        .trim()
        .required(),

    coll_joined_year: Joi.date()
        .required(),

    coll_email: Joi.string()
        .email()
        .lowercase()
        .required(),
});

module.exports = userSchema;