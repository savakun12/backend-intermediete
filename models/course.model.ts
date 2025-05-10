import { ResultSetHeader } from "mysql2";
import db from "../config/db";

const getAllCourses = async () => {
  const [rows] = await db.query<ResultSetHeader>(
    "SELECT * FROM courses WHERE deleted_at IS NULL"
  );
  return rows;
};

const getCourseById = async (id: string) => {
  const [rows] = await db.query<ResultSetHeader>(
    "SELECT * FROM courses WHERE id = ? AND deleted_at IS NULL LIMIT 1",
    [id]
  );
  return rows;
};

const createCourse = async (
  image: string,
  title: string,
  subtitle: string,
  rating: number,
  description: string,
  price: number,
  discount: number
) => {
  const [rows] = await db.query(
    "INSERT INTO courses (image, title, subtitle, rating, description, price, discount) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [image, title, subtitle, rating, description, price, discount]
  );
  return rows;
};

const updateCourse = async (
  id: string,
  image: string,
  title: string,
  subtitle: string,
  rating: number,
  description: string,
  price: number,
  discount: number
) => {
  const [rows] = await db.query<ResultSetHeader>(
    `
    UPDATE courses
    SET image = ?, title = ?, subtitle = ?, rating = ?, description = ?, price = ?, discount = ?
    WHERE id = ? AND deleted_at IS NULL
  `,
    [image, title, subtitle, rating, description, price, discount, id]
  );
  return rows;
};

const deleteCourse = async (id: string) => {
  const [rows] = await db.query<ResultSetHeader>(
    "UPDATE courses SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL",
    [id]
  );
  return rows;
};

export {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
