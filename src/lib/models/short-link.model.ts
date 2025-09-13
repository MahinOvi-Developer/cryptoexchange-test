import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface IShortLink {
    id?: number;
    shortCode: string;
    originalUrl: string;
    createdAt?: Date;
}

const getDB = async () => {
    const { db } = await import('../config/Database');
    return db;
};

export class ShortLinkModel {
    static async create(data: Omit<IShortLink, 'id' | 'createdAt'>): Promise<IShortLink> {
        const database = await getDB();
        const [result] = await database.execute<ResultSetHeader>(
            'INSERT INTO short_links (short_code, original_url, created_at) VALUES (?, ?, NOW())',
            [data.shortCode, data.originalUrl]
        );
        
        const [rows] = await database.execute<RowDataPacket[]>(
            'SELECT * FROM short_links WHERE id = ?',
            [result.insertId]
        );
        
        return rows[0] as IShortLink;
    }

    static async findByShortCode(shortCode: string): Promise<IShortLink | null> {
        const database = await getDB();
        const [rows] = await database.execute<RowDataPacket[]>(
            'SELECT * FROM short_links WHERE short_code = ? AND created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)',
            [shortCode]
        );
        
        return rows.length > 0 ? rows[0] as IShortLink : null;
    }

    static async deleteExpired(): Promise<void> {
        const database = await getDB();
        await database.execute(
            'DELETE FROM short_links WHERE created_at <= DATE_SUB(NOW(), INTERVAL 30 DAY)'
        );
    }
}

export default ShortLinkModel;
