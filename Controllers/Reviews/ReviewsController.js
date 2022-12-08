import { findAllReviewsRdao } from "../../DAO/reviewDao.js";
const findAllReviewsMethod = async (req, res) => {
  const reviews = await findAllReviewsRdao();
  res.json(reviews);
};
const ReviewsController = (app) => {
  app.get("/api/reviews", findAllReviewsMethod);
};
export default ReviewsController;
