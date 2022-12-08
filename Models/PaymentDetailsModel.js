import mongoose from "mongoose";
const schema = mongoose.Schema({
  type: { type: String, required: true },
  cardName: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cvv: { type: String, required: true },
  expiryDate: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users", default: [] }],
});
export default mongoose.model("PaymentDetails", schema);
