import db from "../config/db";
const syncDatabase = async () => {
  const connection = await db.getConnection();
  console.log("Syncing database...");
  try {
    await connection.query(
      `CREATE TABLE IF NOT EXISTS users (
    id CHAR(255) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    avatar VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT NULL
  )`
    );

    await connection.query(`
      CREATE TABLE IF NOT EXISTS courses (
          id INT AUTO_INCREMENT PRIMARY KEY,
          image VARCHAR(255),
          title VARCHAR(255) NOT NULL,
          subtitle VARCHAR(255),
          rating DECIMAL(2, 1),
          description TEXT,
          price DECIMAL(10, 2),
          discount DECIMAL(10, 2) DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted_at DATETIME DEFAULT NULL
      )`);

    console.log("Database synced successfully.");
    connection.release();
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

export { syncDatabase };
