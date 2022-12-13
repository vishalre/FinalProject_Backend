import UserModel from "../Models/UserModel.js";
export const findAllUsersUdao = () => UserModel.find();
export const findOneUserUdao = async (uid) =>
  await UserModel.findOne({ _id: uid })
  .populate("address")
  .populate("paymentInfo")
  .populate({ path: "likes", populate: "product" })
  .populate("cart")
  .populate({ path: "reviews", populate: "product" })
  .exec();
export const findUserProfileUdao = async (uid) =>
  await UserModel.findOne({ _id: uid }).populate("reviews").exec();
export const createUserUdao = (User) => UserModel.create(User);
export const deleteUserUdao = (uid) => UserModel.deleteOne({ _id: uid });
export const updateUserUdao = (uid, User) =>
  UserModel.updateOne({ _id: uid }, { $set: User });
export const addItemCartUdao = (uid, productId) =>
  UserModel.updateOne({ _id: uid }, { $push: { cart: productId } });
export const addAddressUdao = (uid, addressId) =>
  UserModel.updateOne({ _id: uid }, { $push: { address: addressId } });
export const addReviewUdao = (uid, reviewId) =>
  UserModel.updateOne({ _id: uid }, { $push: { reviews: reviewId } });
export const addPaymentUdao = (uid, reviewId) =>
  UserModel.updateOne({ _id: uid }, { $push: { paymentInfo: reviewId } });
export const addLikeUdao = (uid, LikeID) =>
  UserModel.updateOne({ _id: uid }, { $push: { likes: LikeID } });

export const removeItemCartUdao = (uid, productId) =>
  UserModel.updateOne({ _id: uid }, { $pull: { cart: productId } });
export const removeAddressUdao = (uid, addressId) =>
  UserModel.updateOne({ _id: uid }, { $pull: { address: addressId } });
export const removeReviewUdao = (uid, reviewId) =>
  UserModel.updateOne({ _id: uid }, { $pull: { reviews: reviewId } });
export const removePaymentUdao = (uid, reviewId) =>
  UserModel.updateOne({ _id: uid }, { $pull: { paymentInfo: reviewId } });
export const removeLikeUdao = (uid, LikeID) =>
  UserModel.updateOne({ _id: uid }, { $pull: { likes: LikeID } });
