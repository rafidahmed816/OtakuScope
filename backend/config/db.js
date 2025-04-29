// backend/config/db.js
const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "7156213111566",
  database: "otakuscope",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to get a connection from the pool
const getDBConnection = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (err) {
    console.error("Error getting database connection:", err);
    throw err;
  }
};

// Function to check if the connection pool is active
const checkConnection = async () => {
  try {
    const connection = await getDBConnection();
    await connection.ping();
    console.log("Database connection is active.");
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error("Database connection is not active:", err);
  }
};

// Function to close the connection pool (if needed)
const endPool = async () => {
  try {
    await pool.end();
    console.log("Database connection pool closed.");
  } catch (err) {
    console.error("Error closing the database connection pool:", err);
  }
};

module.exports = { getDBConnection, checkConnection, endPool };