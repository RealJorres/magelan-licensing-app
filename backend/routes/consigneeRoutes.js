import express from "express";
import {
  addConsignee,
  deleteConsignee,
  getAllConsignee,
  getConsigneeById,
} from "../controllers/consigneeController.js";
import { protect, client } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, client, getAllConsignee);

router.route("/add").post(protect, client, addConsignee);

router
  .route(":id")
  .get(protect, client, getConsigneeById)
  .delete(protect, client, deleteConsignee);

export default router;
