const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewShema } = require("./Schema.js");
const Listing = require("./models/Listing.js");
module.exports.isLoggedIn = (req, res, next) => {
  req.session.redirectUrl = req.originalUrl;
  if (!req.isAuthenticated()) {
    req.flash("error", "you must be logged!");
    return res.redirect("/login");
  }
  next();
};
module.exports.savedRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) res.locals.redirectUrl = req.session.redirectUrl;
  next();
};
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "you  are not the owner of the listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errorMsg = error.details.map((ele) => ele.message).join(",");
    throw new ExpressError(400, errorMsg);
  } else {
    next();
  }
};
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewShema.validate(req.body);
  if (error) {
    let errorMsg = error.details.map((ele) => ele.message).join(",");
    throw new ExpressError(400, errorMsg);
  } else {
    next();
  }
};
