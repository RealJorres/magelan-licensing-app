import express from "express";
import { protect, client } from "../middleware/authMiddleware.js";
import {
  addOriginPort,
  deleteOriginPort,
  getAllOriginPorts,
  getOriginPortById,
} from "../controllers/originPortController.js";

const router = express.Router();

router.route("/").get(protect, client, getAllOriginPorts);

router.route("/add").post(protect, client, addOriginPort);

router
  .route(":id")
  .get(protect, client, getOriginPortById)
  .delete(protect, client, deleteOriginPort);

export default router;
