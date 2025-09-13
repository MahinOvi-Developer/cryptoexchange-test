import mysql from 'mysql2/promise';

let db: mysql.Connection;

const initDB = async () => {
    db = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'swap_zone',
        port: parseInt(process.env.DB_PORT || '3306')
    });
    return db;
};

const connectDB = async () => {
    try {
        if (!db) {
            await initDB();
        }
        console.log(`MySQL Connected`);
        
        // Create tables if they don't exist
        await createTables();
    } catch (error) {
        console.log(`MySQL Error: ${error}`)
    }
};

const createTables = async () => {
    if (!db) {
        await initDB();
    }
    
    // Create transaction_mappings table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS transaction_mappings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            transaction_id VARCHAR(255) NOT NULL,
            adapter ENUM('changelly', 'letsexchange', 'easybit', 'changenow') NOT NULL,
            adapter_name VARCHAR(255),
            user_unique VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_transaction_id (transaction_id),
            INDEX idx_adapter (adapter)
        )
    `);
    
    // Create short_links table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS short_links (
            id INT AUTO_INCREMENT PRIMARY KEY,
            short_code VARCHAR(255) NOT NULL UNIQUE,
            original_url TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_short_code (short_code),
            INDEX idx_created_at (created_at)
        )
    `);
};

export { connectDB, db };