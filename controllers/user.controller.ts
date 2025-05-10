import { Request, Response } from "express";
import { createId } from "@paralleldrive/cuid2";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
} from "../models/user.model";
import { error } from "console";

const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    if (users.affectedRows === 0) {
      res.status(404).json({
        code: 404,
        success: false,
        message: "No users found in the database.",
      });
      return;
    }
    res.status(200).json({
      code: 200,
      success: true,
      message: "Users retrieved successfully.",
      data: users,
    });
    return;
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      code: 500,
      success: false,
      message: "An error occurred while retrieving users.",
    });
    return;
  }
};

const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (user.affectedRows === 0) {
      res.status(404).json({
        code: 404,
        success: false,
        message: `User not found.`,
      });
      return;
    }
    res.status(200).json({
      code: 200,
      success: true,
      message: "User retrieved successfully.",
      data: user,
    });
    return;
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      code: 500,
      success: false,
      message: "An error occurred while retrieving the user.",
    });
    return;
  }
};

const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, phone_number, password } = req.body;
    if (!name || !email || !phone_number || !password) {
      res.status(400).json({
        code: 400,
        success: false,
        message: "All fields are required.",
      });
      return;
    }
    const id = createId();
    const existingUser = await getUserByEmail(email);
    if (existingUser === email) {
      res.status(409).json({
        code: 409,
        success: false,
        message: "User with this email already exists.",
      });
      return;
    }
    const user = await createUser(id, name, email, phone_number, password);

    res.status(201).json({
      code: 201,
      success: true,
      message: "User created successfully.",
      data: user,
    });
    return;
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      code: 500,
      success: false,
      message: "An error occurred while creating the user.",
    });
    return;
  }
};

const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone_number, avatar, password } = req.body;
    if (!name || !email || !phone_number) {
      res.status(400).json({
        code: 400,
        success: false,
        message: "All fields are required.",
      });
      return;
    }

    const updatedUser = await updateUser(
      id,
      name,
      email,
      phone_number,
      avatar,
      password
    );

    if (updatedUser.affectedRows === 0) {
      res.status(404).json({
        code: 404,
        success: false,
        message: `User not found.`,
      });
      return;
    }

    res.status(200).json({
      code: 200,
      success: true,
      message: "User updated successfully.",
      data: updatedUser,
    });
    return;
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      code: 500,
      success: false,
      message: "An error occurred while updating the user.",
    });
    return;
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    if (user.affectedRows === 0) {
      res.status(404).json({
        code: 404,
        success: false,
        message: `User with not found.`,
      });
      return;
    }
    res.status(200).json({
      code: 200,
      success: true,
      message: "User deleted successfully.",
      data: user,
    });
    return;
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      code: 500,
      success: false,
      message: "An error occurred while deleting the user.",
    });
    return;
  }
};

export {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
};
