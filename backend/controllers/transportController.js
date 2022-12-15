import asyncHandler from "express-async-handler";
import AppError from "../utils/apperror.js";
import ApiFeatures from "../utils/apifeatures.js";
import Transport from "../models/Transport.js";

const addTransport = asyncHandler(async (req, res) => {
  const { transportMeans, transportDetails } = req.body;

  const transportExist = await Transport.findOne({ transportDetails });
  if (transportExist) {
    res.status(400);
    throw new Error("Transport Already Exist");
  }

  const transport = await Transport.create({
    transportMeans,
    transportDetails,
  });

  if (transport) {
    res.status(201).json({
      _id: transport._id,
      transportMeans: transport.transportMeans,
      transportDetails: transport.transportDetails,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Transport Data");
  }
});

const getAllTransport = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(Transport.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const transport = await features.query;
  if (!transport) {
    return next(new AppError("Transport Does Not Exist", 404));
  }
  return res.status(200).json(transport);
});

const getTransportById = asyncHandler(async (req, res) => {
  const transport = await Transport.findById(req.params.id);
  if (transport) {
    res.json(transport);
  } else {
    res.status(404);
    throw new Error("Transport not found");
  }
});

const deleteTransport = asyncHandler(async (req, res) => {
  const transport = await Transport.findById(req.params.id);
  if (transport) {
    await transport.remove();
    res.json({ message: "Transport Removed" });
  } else {
    res.status(404);
    throw new Error("Transport not found");
  }
});

export { addTransport, getAllTransport, getTransportById, deleteTransport };
