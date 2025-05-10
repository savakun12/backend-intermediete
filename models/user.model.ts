import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../config/db";

const getAllUsers = async () => {
  const [rows] = await db.query<ResultSetHeader>(
    "SELECT id, name, email, phone_number, avatar FROM users WHERE deleted_at IS NULL"
  );
  return rows;
};

const getUserById = async (id: string) => {
  const [rows] = await db.query<ResultSetHeader>(
    "SELECT id, name, email, phone_number, avatar FROM users WHERE id = ? AND deleted_at IS NULL LIMIT 1",
    [id]
  );
  return rows;
};

const getUserByEmail = async (email: string) => {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT email FROM users WHERE email = ? AND deleted_at IS NULL LIMIT 1",
    [email]
  );
  return rows.length > 0 ? rows[0].email : null;
};

const createUser = async (
  id: string,
  name: string,
  email: string,
  phone_number: string,
  password: string
) => {
  const [rows] = await db.query(
    "INSERT INTO users (id, name, email, phone_number, password) VALUES (?, ?, ?, ?, ?)",
    [id, name, email, phone_number, password]
  );
  return rows;
};

const updateUser = async (
  id: string,
  name: string,
  email: string,
  phone_number: string,
  avatar?: string,
  password?: string
) => {
  let query =
    "UPDATE users SET name = ?, email = ?, phone_number = ?, avatar = ?";
  let values: any[] = [name, email, phone_number, avatar];

  if (password) {
    query += ", password = ?";
    values.push(password);
  }

  query += " WHERE id = ? AND deleted_at IS NULL";
  values.push(id);

  const [result] = await db.query<ResultSetHeader>(query, values);
  return result;
};

const deleteUser = async (id: string) => {
  const [rows] = await db.query<ResultSetHeader>(
    "UPDATE users SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL",
    [id]
  );
  return rows;
};

export {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
