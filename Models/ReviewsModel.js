import mongoose from "mongoose";

const schema = mongoose.Schema({
  review: { type: String, default: "" },
  rating: { type: Number, required: true, default: "" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prods",
    required: true,
  },
});

export default mongoose.model("Reviews", schema);
