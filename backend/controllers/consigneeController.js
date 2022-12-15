import asyncHandler from "express-async-handler";
import AppError from "../utils/apperror.js";
import ApiFeatures from "../utils/apifeatures.js";
import Consignee from "../models/Consignee.js";

const addConsignee = asyncHandler(async (req, res) => {
  const { shipperId, consigneeName, consigneeAddress, consigneeContactNumber } =
    req.body;

  const consigneeExists = await Consignee.findOne({ consigneeName });
  if (consigneeExists) {
    res.status(400);
    throw new Error("Consignee Already Exists");
  }

  const consignee = await Consignee.create({
    shipperId,
    consigneeName,
    consigneeAddress,
    consigneeContactNumber,
  });

  if (consignee) {
    res.json({
      _id: consignee._id,
      shipperId: consignee.shipperId,
      consigneeName: consignee.consigneeName,
      consigneeAddress: consignee.consigneeAddress,
      consigneeContactNumber: consignee.consigneeContactNumber,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Consignee Data");
  }
});

const getAllConsignee = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(Consignee.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const consignee = await features.query;
  if (!consignee) {
    return next(new AppError("Consignee Does Not Exists", 404));
  } else {
    return res.status(200).json(consignee);
  }
});

const getConsigneeById = asyncHandler(async (req, res) => {
  const consignee = await Consignee.findById(req.params.id);
  if (consignee) {
    res.json(consignee);
  } else {
    res.status(404);
    throw new Error("Consignee not found");
  }
});

const deleteConsignee = asyncHandler(async (req, res) => {
  const consignee = await Consignee.findById(req.params.id);
  if (consignee) {
    await consignee.remove();
    res.json({ message: "Consignee Removed" });
  } else {
    res.status(404);
    throw new Error("Consignee not found");
  }
});

export { addConsignee, getAllConsignee, getConsigneeById, deleteConsignee };
