import mongoose from "mongoose";
const Schema = mongoose.Schema;

const consigneeSchema = new Schema({
  shipperId: {
    type: Schema.Types.ObjectId,
    ref: "Shipper",
    required: true,
  },
  consigneeName: {
    type: String,
    required: true,
  },
  consigneeAddress: {
    type: String,
    required: true,
  },
  consigneeContactNumber: {
    type: Number,
    required: true,
  },
});

const Consignee = mongoose.model("Consignee", consigneeSchema);

export default Consignee;
