import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL!;

if (!DATABASE_URL) {
  throw new Error('Please define the DATABASE_URL environment variable inside .env.local');
}

let cached = (global as any).mysql;

if (!cached) {
  cached = (global as any).mysql = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mysql.createConnection(DATABASE_URL);
  }

  try {
    cached.conn = await cached.promise;
    
    // Create transaction_mappings table if it doesn't exist
    await cached.conn.execute(`
      CREATE TABLE IF NOT EXISTS transaction_mappings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        transaction_id VARCHAR(255) NOT NULL UNIQUE,
        adapter ENUM('easybit', 'letsexchange', 'changelly', 'change_now') NOT NULL,
        adapter_name VARCHAR(255) NOT NULL,
        user_unique VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_transaction_id (transaction_id),
        INDEX idx_adapter (adapter)
      )
    `);
    
    console.log('Connected to MySQL database and ensured transaction_mappings table exists');
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
