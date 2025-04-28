const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "./Baymax2024", // Replace with your database password
  database: "otakuscope2",    // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10,       // Maximum number of connections in the pool
  queueLimit: 0              // Unlimited queueing
});


// Function to get a single connection (if needed)
const getDBConnection = async () => {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool
    return connection;
  } catch (err) {
    console.error("Database connection error:", err);
    throw err;
  }
};

// Function to check if the connection is alive
const checkConnection = async () => {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool
    await connection.ping(); // Test the connection
    console.log("Database connection is active.");
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error("Database connection is not active:", err);
    throw err;
  }
};

module.exports = { pool, getDBConnection, checkConnection };
