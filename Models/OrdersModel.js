import mongoose from "mongoose";

const schema = mongoose.Schema({
     user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
     order: {type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
     payment: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "PaymentDetails",
         required: true
     },
     date: {
         type:String,
         required: true
     }
     });

export default mongoose.model("Orders", schema);
