import express from "express";
import {
  addTransport,
  deleteTransport,
  getAllTransport,
  getTransportById,
} from "../controllers/transportController.js";
import { protect, client } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, client, getAllTransport);

router.route("/add").post(protect, client, addTransport);

router
  .route(":id")
  .get(protect, client, getTransportById)
  .delete(protect, client, deleteTransport);

export default router;
