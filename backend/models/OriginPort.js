import mongoose from "mongoose";
const Schema = mongoose.Schema;

const originPortSchema = new Schema({
  originPortAddress: {
    type: String,
    required: true,
  },
  originPortName: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

const OriginPort = mongoose.model("OriginPort", originPortSchema);

export default OriginPort;
