import express from "express";
import {
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  authUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);

router.route("/login").post(authUser);

router
  .route("/:id")
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser);

export default router;
