// import db from "../config/db";
// const syncDatabase = async () => {
//   const connection = await db.getConnection();
//   console.log("Syncing database...");
//   try {
//     await connection.query(
//       `CREATE TABLE IF NOT EXISTS users (
//     id CHAR(255) PRIMARY KEY,
//     name VARCHAR(50) NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     phone_number VARCHAR(20) NOT NULL,
//     avatar VARCHAR(255),
//     password VARCHAR(255) NOT NULL,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     deleted_at DATETIME DEFAULT NULL
//   )`
//     );

//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS tutors (
//           id CHAR(255) PRIMARY KEY,
//           name VARCHAR(50) NOT NULL,
//           job_title VARCHAR(255) NOT NULL,
//           company VARCHAR(255) NOT NULL,
//           avatar VARCHAR(255),
//           created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//           updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//           deleted_at DATETIME DEFAULT NULL
//       )`);

//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS courses (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           image VARCHAR(255),
//           title VARCHAR(255) NOT NULL,
//           subtitle VARCHAR(255),
//           rating DECIMAL(2, 1),
//           description TEXT,
//           price DECIMAL(10, 2),
//           discount DECIMAL(10, 2) DEFAULT 0,
//           tutor_id CHAR(255) NOT NULL,
//           created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//           updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//           deleted_at DATETIME DEFAULT NULL,
//           FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE CASCADE
//       )`);

//     await connection.query(`
//     CREATE TABLE IF NOT EXISTS enrollments (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         progress INT DEFAULT 0,
//         user_id CHAR(255) NOT NULL,
//         course_id INT NOT NULL,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//         deleted_at DATETIME DEFAULT NULL,
//         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
//         FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
//     )`);

//     await connection.query(`
//     CREATE TABLE IF NOT EXISTS reviews (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         rating INT NOT NULL,
//         comment TEXT,
//         course_id INT NOT NULL,
//         user_id CHAR(255) NOT NULL,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//         deleted_at DATETIME DEFAULT NULL,
//         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
//         FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
//     )`);

//     await connection.query(`
//     CREATE TABLE IF NOT EXISTS orders (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         invoice_number VARCHAR(255) NOT NULL,
//         purchase_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//         purchase_deadline DATETIME NOT NULL,
//         status ENUM( "pending", "completed", "cancelled") NOT NULL,
//         enrollment_id INT NOT NULL,
//         user_id CHAR(255) NOT NULL,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//         deleted_at DATETIME DEFAULT NULL,
//         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
//         FOREIGN KEY (enrollment_id) REFERENCES enrollments(id) ON DELETE CASCADE
//     )`);

//     await connection.query(`
//     CREATE TABLE IF NOT EXISTS payments (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         category ENUM("bank_transfer","e_wallet","credit_card") NOT NULL,
//         method VARCHAR(255) NOT NULL,
//         amount DECIMAL(10, 2) NOT NULL,
//         status ENUM("pending", "completed", "failed") NOT NULL,
//         order_id INT NOT NULL,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//         deleted_at DATETIME DEFAULT NULL,
//         FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
//     )`);

//     await connection.query(`
//     CREATE TABLE IF NOT EXISTS course_categories (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//         deleted_at DATETIME DEFAULT NULL
//     )`);

//     await connection.query(`
//         CREATE TABLE IF NOT EXISTS course_modules(
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         course_id INT NOT NULL,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//         deleted_at DATETIME DEFAULT NULL,
//         FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
//         )`);

//     await connection.query(`
//           CREATE TABLE IF NOT EXISTS course_categories_map (
//               id INT AUTO_INCREMENT PRIMARY KEY,
//               course_category_id INT NOT NULL,
//               course_id INT NOT NULL,
//               created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//               updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//               deleted_at DATETIME DEFAULT NULL,
//               FOREIGN KEY (course_category_id) REFERENCES course_categories(id) ON DELETE CASCADE,
//               FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
//           )`);

//     await connection.query(`
//             CREATE TABLE IF NOT EXISTS course_module_materials(
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 title VARCHAR(255) NOT NULL,
//                 type ENUM ("summary", "video", "pretest", "quiz", "posttest") NOT NULL,
//                 course_module_id INT NOT NULL,
//                 created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//                 updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//                 deleted_at DATETIME DEFAULT NULL,
//                 FOREIGN KEY (course_module_id) REFERENCES course_modules(id) ON DELETE CASCADE
//             )`);

//     await connection.query(`
//             CREATE TABLE IF NOT EXISTS course_module_materials_summaries(
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 title VARCHAR(255) NOT NULL,
//                 description TEXT NOT NULL,
//                 url VARCHAR(255),
//                 course_module_material_id INT NOT NULL,
//                 created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//                 updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//                 deleted_at DATETIME DEFAULT NULL,
//                 FOREIGN KEY (course_module_material_id) REFERENCES course_module_materials(id) ON DELETE CASCADE
//             )`);

//     await connection.query(`
//                 CREATE TABLE IF NOT EXISTS course_module_materials_videos(
//                     id INT AUTO_INCREMENT PRIMARY KEY,
//                     title VARCHAR(255) NOT NULL,
//                     description TEXT NOT NULL,
//                     url VARCHAR(255) NOT NULL,
//                     course_module_material_id INT NOT NULL,
//                     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//                     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//                     deleted_at DATETIME DEFAULT NULL,
//                     FOREIGN KEY (course_module_material_id) REFERENCES course_module_materials(id) ON DELETE CASCADE
//                 )`);

//     await connection.query(`
//                     CREATE TABLE IF NOT EXISTS course_module_materials_quizzes(
//                         id INT AUTO_INCREMENT PRIMARY KEY,
//                         title VARCHAR(255) NOT NULL,
//                         type ENUM ("quiz", "pretest", "posttest") NOT NULL,
//                         date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//                         right_answer INT NOT NULL,
//                         wrong_answer INT NOT NULL,
//                         total_questions INT NOT NULL,
//                         total_score INT NOT NULL,
//                         course_module_material_id INT NOT NULL,
//                         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//                         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//                         deleted_at DATETIME DEFAULT NULL,
//                         FOREIGN KEY (course_module_material_id) REFERENCES course_module_materials(id) ON DELETE CASCADE
//                     )`);

//     await connection.query(`
//     CREATE TABLE IF NOT EXISTS quiz_questions(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     question VARCHAR(255) NOT NULL,
//     answer VARCHAR(255) NOT NULL,
//     quiz_id INT NOT NULL,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     deleted_at DATETIME DEFAULT NULL,
//     FOREIGN KEY (quiz_id) REFERENCES course_module_materials_quizzes(id) ON DELETE CASCADE
//   )`);

//     console.log("Database synced successfully.");
//     connection.release();
//   } catch (error) {
//     console.error("Error syncing database:", error);
//   }
// };

// export { syncDatabase };
