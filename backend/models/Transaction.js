import mongoose from "mongoose";
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  shipperId: {
    type: Schema.Types.ObjectId,
    ref: "Shipper",
    required: true,
  },
  consigneeId: {
    type: Schema.Types.ObjectId,
    ref: "Consignee",
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  transactionOriginPort: {
    type: Schema.Types.ObjectId,
    ref: "OriginPort",
    required: true,
  },
  transactionDestinationPort: {
    type: Schema.Types.ObjectId,
    ref: "DestinationPort",
    required: true,
  },
  transportId: {
    type: Schema.Types.ObjectId,
    ref: "Transport",
    required: true,
  },
  transactionDepartureDate: {
    type: Date,
    required: true,
  },
  transactionFee: {
    type: Number,
    required: true,
  },
  transactionORNumber: {
    type: String,
    required: true,
  },
  transactionORDate: {
    type: Date,
    required: true,
  },
  transactionIssuer: {
    type: String,
    required: true,
  },
  transactionInspector: {
    type: String,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
