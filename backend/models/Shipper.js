import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shipperSchema = new Schema({
  transactionId: {
    type: Schema.Types.ObjectId,
    ref: "Transaction",
    required: true,
  },
  shipperName: {
    type: String,
    required: true,
  },
  shipperAddress: {
    type: String,
    required: true,
  },
  shipperContactNumber: {
    type: Number,
    required: true,
  },
});

const Shipper = mongoose.model("Shipper", shipperSchema);

export default Shipper;
