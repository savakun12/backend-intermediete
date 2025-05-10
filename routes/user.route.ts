import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/users", getAllUsersController);
router.get("/users/:id", getUserByIdController);
router.post("/users", createUserController);
router.patch("/users/:id", updateUserController);
router.delete("/users/:id", deleteUserController);

export default router;
