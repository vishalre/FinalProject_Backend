import mongoose from "mongoose";

const schema = mongoose.Schema({
  addressLine: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users", default: [] }],
});
export default mongoose.model("Addresses", schema);
