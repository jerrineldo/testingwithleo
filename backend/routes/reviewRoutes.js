import {
  //Import all our controllers
  addReview,
  getReviews,
  getReviewById,
  updateReview,
  removeReview
} from "../controllers/reviewController.js";

const routes = (app) => {
  app.route("/reviews").get(getReviews).post(addReview);

  app
    .route("/review/:ReviewId")
    .get(getReviewById)
    .put(updateReview)
    .delete(removeReview);
};

export default routes;
