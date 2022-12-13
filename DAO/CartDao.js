import CartModel from "../Models/CartModel.js";
import OrdersModel from "../Models/OrdersModel.js";

export const findCartOfUser = (user) => CartModel.find({ user: user });
export const deleteFromCart = (id) => CartModel.deleteOne({ product: id });
export const updateCart = (id, cart) => CartModel.updateOne({_id: id}, cart);
export const addToCart = (cart) => CartModel.create(cart);
export const addToOrder = (order) => OrdersModel.create(order);
export const findOrderByUser = (id) => OrdersModel.find({user:id});