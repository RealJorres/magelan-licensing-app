import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  commodityId: {
    type: Schema.Types.ObjectId,
    ref: "Commodity",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productMarketValue: {
    type: Number,
    required: true,
  },
  productNote: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
