import asyncHandler from "express-async-handler";
import AppError from "../utils/apperror.js";
import ApiFeatures from "../utils/apifeatures.js";
import OriginPort from "../models/OriginPort.js";

const addOriginPort = asyncHandler(async (req, res) => {
  const { originPortAddress, originPortName, location } = req.body;

  const originPortExists = await OriginPort.findOne({ originPortName });
  if (originPortExists) {
    res.status(400);
    throw new Error("Origin Port Already Exist");
  }

  const originPort = await OriginPort.create({
    originPortAddress,
    originPortName,
    location,
  });

  if (originPort) {
    res.status(201).json({
      _id: originPort.id,
      originPortAddress: originPort.originPortAddress,
      originPortName: originPort.originPortName,
      location: originPort.location,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Origin Port Data");
  }
});

const getAllOriginPorts = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(OriginPort.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const originPort = await features.query;
  if (!originPort) {
    return next(new AppError("Origin Port Does Not Exist", 404));
  }
  return res.status(200).json(originPort);
});

const getOriginPortById = asyncHandler(async (req, res, next) => {
  const originPort = await OriginPort.findById(req.params.id);
  if (originPort) {
    res.json(originPort);
  } else {
    res.status(404);
    throw new Error("Origin Port not found");
  }
});

const deleteOriginPort = asyncHandler(async (req, res) => {
  const originPort = await OriginPort.findById(req.params.id);
  if (originPort) {
    await originPort.remove();
    res.json({ message: "Origin Port Removed" });
  } else {
    res.status(404);
    throw new Error("Origin Port not found");
  }
});

export {
  addOriginPort,
  getAllOriginPorts,
  getOriginPortById,
  deleteOriginPort,
};
