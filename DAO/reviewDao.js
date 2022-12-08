import ReviewsModel from "../Models/ReviewsModel.js";
export const findAllReviewsRdao = () => ReviewsModel.find();
export const findOneReviewsRdao = (id) => ReviewsModel.findOne({ _id: id });
export const deleteReviewsRdao = (aid) => ReviewsModel.deleteOne({ _id: aid });
export const CreateReviewRdao = (review) => ReviewsModel.create(review);
