import mongoose from "mongoose";

const schema = mongoose.Schema({
     catalogName: { type: String, required: true },
     });

export default mongoose.model("Catalogs", schema);
