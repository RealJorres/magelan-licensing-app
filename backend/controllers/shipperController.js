import asyncHandler from "express-async-handler";
import AppError from "../utils/apperror.js";
import ApiFeatures from "../utils/apifeatures.js";
import Shipper from "../models/Shipper.js";

const addShipper = asyncHandler(async (req, res) => {
  const { transactionId, shipperName, shipperAddress, shipperContactNumber } =
    req.body;

  const shipperExists = await Shipper.findOne({ shipperName });
  if (shipperExists) {
    res.status(400);
    throw new Error("Shipper Already Exist");
  }

  const shipper = await Shipper.create({
    transactionId,
    shipperName,
    shipperAddress,
    shipperContactNumber,
  });

  if (shipper) {
    res.json({
      _id: shipper._id,
      transactionId: shipper.transactionId,
      shipperName: shipper.shipperName,
      shipperAddress: shipper.shipperAddress,
      shipperContactNumber: shipper.shipperContactNumber,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Shipper Data");
  }
});

const getAllShipper = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(Shipper.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const shipper = await features.query;
  if (!shipper) {
    return next(new AppError("Shipper Does Not Exist", 404));
  }
  return res.status(200).json(shipper);
});

const getShipperById = asyncHandler(async (req, res) => {
  const shipper = await Shipper.findById(req.params.id);
  if (shipper) {
    res.json(shipper);
  } else {
    res.status(404);
    throw new Error("Shipper not found");
  }
});

const deleteShipper = asyncHandler(async (req, res) => {
  const shipper = await Shipper.findById(req.params.id);
  if (shipper) {
    await shipper.remove();
    res.json({ message: "Shipper Removed" });
  } else {
    res.status(404);
    throw new Error("Shipper not found");
  }
});

export { addShipper, getAllShipper, getShipperById, deleteShipper };
