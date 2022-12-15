import Commodity from "../models/Commodity.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/apperror.js";
import ApiFeatures from "../utils/apifeatures.js";

const addCommodity = asyncHandler(async (req, res) => {
  const { commodityName, commodityDescription, commodityValue } = req.body;

  const commodityExists = await Commodity.findOne({ commodityName });
  if (commodityExists) {
    res.status(400);
    throw new Error("Commodity Already Exist");
  }

  const commodity = await Commodity.create({
    commodityName,
    commodityDescription,
    commodityValue,
  });

  if (commodity) {
    res.status(201).json({
      _id: commodity._id,
      commodityName: commodity.commodityName,
      commodityDescription: commodity.commodityDescription,
      commodityValue: commodity.commodityValue,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Commodity Data");
  }
});

const updateCommodity = asyncHandler(async (req, res) => {
  const { commodityName, commodityDescription, commodityValue } = req.body;

  const commodity = await Commodity.findById(req.params.id);
  if (commodity) {
    commodity.commodityName = commodityName || commodity.commodityName;
    commodity.commodityDescription =
      commodityDescription || commodity.commodityDescription;
    commodity.commodityValue = commodityValue || commodity.commodityValue;

    const updatedCommodity = await commodity.save();

    res.status(204).json({
      _id: updatedCommodity.id,
      commodityName: updatedCommodity.commodityName,
      commodityDescription: updatedCommodity.commodityDescription,
      commodityValue: updatedCommodity.commodityValue,
    });
  }
});

const getAllCommodity = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(Commodity.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const commodities = await features.query;
  if (!commodities) {
    return next(new AppError("Commodity Does Not Exist", 404));
  }
  return res.status(200).json(commodities);
});

const getCommodityById = asyncHandler(async (req, res) => {
  const commodity = await Commodity.findById(req.params.id);

  if (commodity) {
    res.json(commodity);
  } else {
    return next(new AppError("Commodity Does Not Exist", 404));
  }
});

const deleteCommodity = asyncHandler(async (req, res) => {
  const commodity = await Commodity.findById(req.params.id);
  if (commodity) {
    await commodity.remove();
    res.json({ message: "Commodity Removed" });
  } else {
    res.status(404);
    throw new Error("Commodity not found");
  }
});

export {
  addCommodity,
  updateCommodity,
  getAllCommodity,
  getCommodityById,
  deleteCommodity,
};
