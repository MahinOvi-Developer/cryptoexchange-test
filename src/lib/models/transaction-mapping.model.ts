import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface ITransactionMapping {
  id?: number;
  transactionId: string;
  adapter: string;
  adapterName?: string;
  userUnique?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const getDB = async () => {
  const { db } = await import('../config/Database');
  return db;
};

export class TransactionMappingModel {
  static async create(data: Omit<ITransactionMapping, 'id' | 'createdAt' | 'updatedAt'>): Promise<ITransactionMapping> {
    const database = await getDB();
    const [result] = await database.execute<ResultSetHeader>(
      'INSERT INTO transaction_mappings (transaction_id, adapter, adapter_name, user_unique, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [data.transactionId, data.adapter, data.adapterName || '', data.userUnique || null]
    );
    
    const [rows] = await database.execute<RowDataPacket[]>(
      'SELECT * FROM transaction_mappings WHERE id = ?',
      [result.insertId]
    );
    
    return rows[0] as ITransactionMapping;
  }

  static async findByTransactionId(transactionId: string): Promise<ITransactionMapping | null> {
    const database = await getDB();
    const [rows] = await database.execute<RowDataPacket[]>(
      'SELECT * FROM transaction_mappings WHERE transaction_id = ?',
      [transactionId]
    );
    
    return rows.length > 0 ? rows[0] as ITransactionMapping : null;
  }

  static async findByAdapter(adapter: string): Promise<ITransactionMapping[]> {
    const database = await getDB();
    const [rows] = await database.execute<RowDataPacket[]>(
      'SELECT * FROM transaction_mappings WHERE adapter = ?',
      [adapter]
    );
    
    return rows as ITransactionMapping[];
  }

  static async updateByTransactionId(transactionId: string, data: Partial<ITransactionMapping>): Promise<boolean> {
    const database = await getDB();
    const [result] = await database.execute<ResultSetHeader>(
      'UPDATE transaction_mappings SET adapter = ?, adapter_name = ?, user_unique = ?, updated_at = NOW() WHERE transaction_id = ?',
      [data.adapter, data.adapterName, data.userUnique, transactionId]
    );
    
    return result.affectedRows > 0;
  }

  static async deleteByTransactionId(transactionId: string): Promise<boolean> {
    const database = await getDB();
    const [result] = await database.execute<ResultSetHeader>(
      'DELETE FROM transaction_mappings WHERE transaction_id = ?',
      [transactionId]
    );
    
    return result.affectedRows > 0;
  }
}

export default TransactionMappingModel;
