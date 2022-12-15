import asyncHandler from "express-async-handler";
import AppError from "../utils/apperror.js";
import ApiFeatures from "../utils/apifeatures.js";
import Product from "../models/Product.js";

const addProduct = asyncHandler(async (req, res) => {
  const {
    commodityId,
    productName,
    productDescription,
    productQuantity,
    productMarketValue,
    productNote,
  } = req.body;

  const product = await Product.create({
    commodityId,
    productName,
    productDescription,
    productQuantity,
    productMarketValue,
    productNote,
  });

  if (product) {
    res.status(201).json({
      _id: product._id,
      commodityId: product.commodityId,
      productName: product.productName,
      productDescription: product.productDescription,
      productQuantity: product.productQuantity,
      productMarketValue: product.productMarketValue,
      productNote: product.productNote,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Product Data");
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;
  if (!products) {
    return next(new AppError("Product Does Not Exist", 404));
  }
  return res.status(200).json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { addProduct, getAllProducts, getProductById, deleteProduct };
