import { Request, Response, NextFunction } from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../models/course.model";
import { error } from "console";

const getAllCoursesController = async (req: Request, res: Response) => {
  try {
    const courses = await getAllCourses();
    if (courses.affectedRows === 0) {
      res.status(404).json({
        code: 404,
        success: false,
        message: "No courses found in the database.",
      });
      return;
    }
    res.status(200).json({
      code: 200,
      success: true,
      data: courses,
    });
    return;
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "An internal server error occurred while fetching courses.",
    });
    return;
  }
};

const getCourseByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await getCourseById(id);
    if (course.affectedRows === 0) {
      res.status(404).json({
        code: 404,
        success: false,
        message: `Course  not found.`,
      });
      return;
    }
    res.status(200).json({
      code: 200,
      success: true,
      data: course,
    });
    return;
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "An internal server error occurred while fetching the course.",
    });
    return;
  }
};

const createCourseController = async (req: Request, res: Response) => {
  try {
    const { image, title, subtitle, rating, description, price, discount } =
      req.body;

    if (
      !image ||
      !title ||
      !subtitle ||
      !rating ||
      !description ||
      !price ||
      !discount
    ) {
      res.status(400).json({
        code: 400,
        success: false,
        message:
          "All fields (image, title, subtitle, rating, description, price, discount) are required.",
      });
      return;
    }

    const course = await createCourse(
      image,
      title,
      subtitle,
      rating,
      description,
      price,
      discount
    );

    res.status(201).json({
      code: 201,
      success: true,
      message: "Course successfully created.",
      data: course,
    });
    return;
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "An internal server error occurred while creating the course.",
      error: error,
    });
    return;
  }
};

const updateCourseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { image, title, subtitle, rating, description, price, discount } =
      req.body;

    if (
      !image ||
      !title ||
      !subtitle ||
      !rating ||
      !description ||
      !price ||
      !discount
    ) {
      res.status(400).json({
        code: 400,
        success: false,
        message: "All field are required.",
      });
      return;
    }

    const updatedCourse = await updateCourse(
      id,
      image,
      title,
      subtitle,
      rating,
      description,
      price,
      discount
    );

    if (updatedCourse.affectedRows === 0) {
      res.status(404).json({
        code: 404,
        success: false,
        message: `Course not found.`,
        error: error,
      });
      return;
    }

    res.status(200).json({
      code: 200,
      success: true,
      message: "Course successfully updated.",
      data: updatedCourse,
    });
    return;
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "An internal server error occurred while updating the course.",
    });
    return;
  }
};

const deleteCourseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCourse = await deleteCourse(id);

    if (deletedCourse.affectedRows === 0) {
      res.status(404).json({
        code: 404,
        success: false,
        message: `Course not found.`,
      });
      return;
    }

    res.status(200).json({
      code: 200,
      success: true,
      message: "Course successfully deleted.",
      data: deletedCourse,
    });
    return;
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "An internal server error occurred while deleting the course.",
    });
    return;
  }
};

export {
  getAllCoursesController,
  getCourseByIdController,
  createCourseController,
  updateCourseController,
  deleteCourseController,
};
