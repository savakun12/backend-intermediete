import express from "express";
import {
  createCourseController,
  deleteCourseController,
  getAllCoursesController,
  getCourseByIdController,
  updateCourseController,
} from "../controllers/course.controller";

const router = express.Router();

router.get("/courses", getAllCoursesController);
router.get("/courses/:id", getCourseByIdController);
router.post("/courses", createCourseController);
router.patch("/courses/:id", updateCourseController);
router.delete("/courses/:id", deleteCourseController);

export default router;
