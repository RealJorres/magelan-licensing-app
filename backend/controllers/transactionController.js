import asyncHandler from "express-async-handler";
import AppError from "../utils/apperror.js";
import ApiFeatures from "../utils/apifeatures.js";
import Transaction from "../models/Transaction.js";

const addTransaction = asyncHandler(async (req, res) => {
  const {
    shipperId,
    consigneeId,
    productId,
    transactionDate,
    transactionOriginPort,
    transactionDestinationPort,
    transportId,
    transactionDepartureDate,
    transactionFee,
    transactionORNumber,
    transactionORDate,
    transactionIssuer,
    transactionInspector,
  } = req.body;

  const transactionExists = await Transaction.findOne({ transactionORNumber });
  if (transactionExists) {
    res.status(400);
    throw new Error("Transaction Already Exist");
  }

  const transaction = await Transaction.create({
    shipperId,
    consigneeId,
    productId,
    transactionDate,
    transactionOriginPort,
    transactionDestinationPort,
    transportId,
    transactionDepartureDate,
    transactionFee,
    transactionORNumber,
    transactionORDate,
    transactionIssuer,
    transactionInspector,
  });

  if (transaction) {
    res.json({
      _id: transaction._id,
      shipperId: transaction.shipperId,
      consigneeId: transaction.consigneeId,
      productId: transaction.productId,
      transactionDate: transaction.transactionDate,
      transactionOriginPort: transaction.transactionOriginPort,
      transactionDestinationPort: transaction.transactionDestinationPort,
      transportId: transaction.transportId,
      transactionDepartureDate: transaction.transactionDepartureDate,
      transactionFee: transaction.transactionFee,
      transactionORNumber: transaction.transactionORNumber,
      transactionORDate: transaction.transactionORDate,
      transactionIssuer: transaction.transactionIssuer,
      transactionInspector: transaction.transactionInspector,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Transaction Data");
  }
});

const getAllTransactions = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(Transaction.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const transaction = await features.query;
  if (!transaction) {
    return next(new AppError("Transaction Does Not Exist", 404));
  }
  return res.status(200).json(transaction);
});

const getTransactionsById = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404);
    throw new Error("Transaction not found");
  }
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (transaction) {
    await transaction.remove();
    res.json({ message: "Transaction Removed" });
  } else {
    res.status(404);
    throw new Error("Transaction not found");
  }
});

export {
  addTransaction,
  getAllTransactions,
  getTransactionsById,
  deleteTransaction,
};
