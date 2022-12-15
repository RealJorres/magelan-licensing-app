import express from "express";
import {
  addTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionsById,
} from "../controllers/transactionController.js";
import { client, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, client, getAllTransactions);

router.route("/add").post(protect, client, addTransaction);

router
  .route(":id")
  .get(protect, client, getTransactionsById)
  .delete(protect, client, deleteTransaction);

export default router;
