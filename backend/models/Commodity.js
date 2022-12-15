import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commoditySchema = new Schema({
  commodityName: {
    type: String,
    required: true,
  },
  commodityDescription: {
    type: String,
    required: true,
  },
  commodityValue: {
    type: Number,
    required: true,
  },
});

const Commodity = mongoose.model("Commodity", commoditySchema);

export default Commodity;
