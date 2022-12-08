import mongoose from "mongoose";

const schema = mongoose.Schema({
  users: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prods",
    required: true,
  },
});
export default mongoose.model("Likes", schema);
