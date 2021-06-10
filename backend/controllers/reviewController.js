import mongoose from "mongoose";
import { ReviewSchema } from "../models/reviewModel.js";

const Review = mongoose.model("Review", ReviewSchema);

//Add the seminar to the database
export const addReview = (req, res) => {
  let newReview = new Review(req.body);

  newReview.save((err, Review) => {
    if (err) {
      res.send(err);
    }
    res.json(Review);
  });
};

//Get all the reviews in the database
export const getReviews = (req, res) => {
  Review.find({}, (err, Review) => {
    if (err) {
      res.send(err);
    }
    res.json(Review);
  });
};

//Get reviews by id
export const getReviewById = (req, res) => {
  Review.findById(req.params.ReviewId, (err, Review) => {
    if (err) {
      res.send(err);
    }
    res.json(Review);
  });
};

//Update a particular Review
export const updateReview = (req, res) => {
  Review.findOneAndUpdate(
    { _id: req.params.ReviewId },
    req.body,
    { new: true },
    (err, Review) => {
      if (err) {
        res.send(err);
      }
      res.json(Review);
    }
  );
};

//Remove a particular Review
export const removeReview = (req, res) => {
  Review.remove({ _id: req.params.ReviewId }, (err, Review) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted review" });
  });
};
