import express from "express";
import {
  addCommodity,
  deleteCommodity,
  getAllCommodity,
  getCommodityById,
  updateCommodity,
} from "../controllers/commodityController.js";
import { protect, client } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, client, getAllCommodity);

router.route("/add").post(protect, client, addCommodity);

router
  .route(":id")
  .get(protect, client, getCommodityById)
  .put(protect, client, updateCommodity)
  .delete(protect, client, deleteCommodity);

export default router;
