import ReviewsModel from "../Models/ReviewsModel.js";
export const findAllReviewsRdao = () => ReviewsModel.find();
export const findReviewsByUserdao = (uid) => ReviewsModel.find({user: uid}).populate("product").exec();
export const findOneReviewsRdao = (id) => ReviewsModel.findOne({ _id: id });
export const deleteReviewsRdao = (aid) => ReviewsModel.deleteOne({ _id: aid });
export const CreateReviewRdao = (review, rating, uid, pid) => ReviewsModel.create(
    { review: review, rating: rating, user: uid, product: pid }
);

