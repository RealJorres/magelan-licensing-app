import express from "express";
import {
  addShipper,
  deleteShipper,
  getAllShipper,
  getShipperById,
} from "../controllers/shipperController.js";
import { client, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, client, getAllShipper);

router.route("/add").post(protect, client, addShipper);

router
  .route(":id")
  .get(protect, client, getShipperById)
  .delete(protect, client, deleteShipper);

export default router;
