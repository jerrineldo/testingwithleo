import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ReviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
