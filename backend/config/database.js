import mysql from "mysql2";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL" + err.stack);
      return;
    }
    console.log("Connected to MySQL");
    connection.release();
  });
export default db;
