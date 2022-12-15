import express from "express";
import { protect, client } from "../middleware/authMiddleware.js";
import {
  addDestinationPort,
  getAllDestinationPorts,
  getDestinationPortById,
  deleteDestinationPort,
} from "../controllers/destinationPortController.js";

const router = express.Router();

router.route("/").get(protect, client, getAllDestinationPorts);

router.route("/add").post(protect, client, addDestinationPort);

router
  .route(":id")
  .get(protect, client, getDestinationPortById)
  .delete(protect, client, deleteDestinationPort);

export default router;
