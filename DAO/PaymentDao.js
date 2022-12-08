import PaymentDetailsModel from "../Models/PaymentDetailsModel.js";
export const findAllPaymentsPdao = () => PaymentDetailsModel.find();
export const findOnePaymentsPdao = (pay) =>
  PaymentDetailsModel.findOne({
    type: pay.type,
    cardName: pay.cardName,
    cardNumber: pay.cardNumber,
    cvv: pay.cvv,
    expiryDate: pay.expiryDate,
  });
export const createPaymentsPdao = (payment) =>
  PaymentDetailsModel.create(payment);
export const deletePaymentsPdao = (pid) =>
  PaymentDetailsModel.deleteOne({ _id: pid });
export const updatePaymentsPdao = (pid, payment) =>
  PaymentDetailsModel.updateOne({ _id: pid }, { $set: payment });

export const updateUserPdao = (uid, pid) =>
  PaymentDetailsModel.updateOne({ _id: uid }, { $push: { users: pid } });
export const removeUserPdao = (pid, uid) =>
  PaymentDetailsModel.updateOne({ _id: pid }, { $pull: { users: uid } });
