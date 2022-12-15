import asyncHandler from "express-async-handler";
import AppError from "../utils/apperror.js";
import ApiFeatures from "../utils/apifeatures.js";
import DestinationPort from "../models/DestinationPort.js";

const addDestinationPort = asyncHandler(async (req, res) => {
  const { destinationPortAddress, destinationPortName, location } = req.body;

  const destinationPortExists = await DestinationPort.findOne({
    destinationPortName,
  });
  if (destinationPortExists) {
    res.status(400);
    throw new Error("Destination Port Already Exist");
  }

  const destinationPort = await DestinationPort.create({
    destinationPortAddress,
    destinationPortName,
    location,
  });

  if (destinationPort) {
    res.status(201).json({
      _id: destinationPort.id,
      destinationPortAddress: destinationPort.destinationPortAddress,
      destinationPortName: destinationPort.destinationPortName,
      location: destinationPort.location,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Destination Port Data");
  }
});

const getAllDestinationPorts = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(DestinationPort.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const destinationPort = await features.query;
  if (!destinationPort) {
    return next(new AppError("Destination Port Does Not Exist", 404));
  }
  return res.status(200).json(destinationPort);
});

const getDestinationPortById = asyncHandler(async (req, res, next) => {
  const destinationPort = await DestinationPort.findById(req.params.id);
  if (destinationPort) {
    res.json(destinationPort);
  } else {
    res.status(404);
    throw new Error("Destination Port not found");
  }
});

const deleteDestinationPort = asyncHandler(async (req, res) => {
  const destinationPort = await DestinationPort.findById(req.params.id);
  if (destinationPort) {
    await destinationPort.remove();
    res.json({ message: "Destination Port Removed" });
  } else {
    res.status(404);
    throw new Error("Destination Port not found");
  }
});

export {
  addDestinationPort,
  getAllDestinationPorts,
  getDestinationPortById,
  deleteDestinationPort,
};
