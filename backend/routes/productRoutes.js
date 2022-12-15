import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";
import { client, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, client, getAllProducts);

router.route("/add").post(protect, client, addProduct);

router
  .route(":id")
  .get(protect, client, getProductById)
  .delete(protect, client, deleteProduct);

export default router;
