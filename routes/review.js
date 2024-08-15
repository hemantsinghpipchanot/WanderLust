const express = require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/Listing.js");
const{validateReview, isLoggedIn}=require("../middleware.js");
//Post Reviews
router.post(
    "/",
    validateReview,
    wrapAsync(async (req, res) => {
        console.log(req.params.id);
      let listing = await Listing.findById(req.params.id);
      let review =  new Review(req.body.review);
      review.author=req.user._id;
      listing.reviews.push(review);
      await listing.save();
      await review.save();
      req.flash('success','New Review Created!')
      res.redirect(`/listings/${listing._id}`);
    })
  );
  //Delete Review route
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Review Deleted!')
    res.redirect(`/listings/${id}`);
  }));
module.exports=router;