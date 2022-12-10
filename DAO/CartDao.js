import CartModel from "../Models/CartModel.js";
export const findCartOfUser = (user) => CartModel.find({ user: user });
export const deleteFromCart = (id) => CartModel.deleteOne({ _id: id });
export const updateCart = (id, cart) => CartModel.updateOne({_id: id}, cart);
export const addToCart = (cart) => CartModel.create(cart);
