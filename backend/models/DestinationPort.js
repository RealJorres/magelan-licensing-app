import mongoose from "mongoose";
const Schema = mongoose.Schema;

const destinationPortSchema = new Schema({
  destinationPortAddress: {
    type: String,
    required: true,
  },
  destinationPortName: {
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

const DestinationPort = mongoose.model(
  "DestinationPort",
  destinationPortSchema
);

export default DestinationPort;
