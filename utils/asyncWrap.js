const ExpressError = require("./../ExpressError.js")

module.exports = (fn) => {
    return function (req,res,next) {
        fn(req,res,next).catch(err => {
            req.flash("error",err.message);
            res.redirect(req.headers.referer);
        });
    }
}