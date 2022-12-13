import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String },
  price: { type: String, required: true },
  manufacturer: { type: String },
  asin: { type: String},
  country: { type: String },
  originalPrice: { type: Number, min: 0 },
  discount: { type: Number, min: 0 },
  discountPercentage: { type: Number, min: 0 , max: 100},
  currency: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Likes", default: [] }],
  reviews: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Reviews", default: [] },
  ],
});

export default mongoose.model("Prods", schema);
