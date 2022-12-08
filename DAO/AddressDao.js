import AddressModel from "../Models/AddressModel.js";
export const findAllAddressAdao = () => AddressModel.find();
export const findOneAddressAdao = (address) =>
  AddressModel.findOne({
    addressLine: address.addressLine,
    addressLine2: address.addressLine2,
    city: address.city,
    state: address.state,
    zipcode: address.zipcode,
  });
export const createAddressAdao = (address) => AddressModel.create(address);
export const deleteAddressAdao = (aid) => AddressModel.deleteOne({ _id: aid });
export const updateAddressAdao = (aid, address) =>
  AddressModel.updateOne({ _id: aid }, { $set: address });

export const updateUserAdao = (aid, uid) =>
  AddressModel.updateOne({ _id: aid }, { $push: { users: uid } });
export const removeUserAdao = (aid, uid) =>
  AddressModel.updateOne({ _id: aid }, { $pull: { users: uid } });
