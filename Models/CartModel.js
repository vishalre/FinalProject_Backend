import mongoose from "mongoose";

const schema = mongoose.Schema({
                                   quantity: { type: Number, required: true, default: "" },
                                   user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
                                   product: {
                                       type: String, required: true,
                                   },
                                   ordered: {type: Boolean, default: "false"},
                                   unitPrice: {type:Number, default:20},
                                   productimg: {type:String, required: false,
                                       default:"https://montevista.greatheartsamerica.org/wp-content/uploads/sites/2/2016/11/default-placeholder.png"}
                               });

export default mongoose.model("Cart", schema);
