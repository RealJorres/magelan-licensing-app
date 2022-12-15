import mongoose from "mongoose";
const Schema = mongoose.Schema;

const transportSchema = new Schema({
  transportMeans: {
    type: String,
    required: true,
  },
  transportDetails: {
    type: String,
    required: true,
  },
});

const Transport = mongoose.model("Transport", transportSchema);

export default Transport;
