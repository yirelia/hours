import mysql from "mysql2/promise";
import { config } from "../config";

// 创建数据库连接池
export const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 测试数据库连接
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection();
    console.log("✓ 数据库连接成功");
    connection.release();
    return true;
  } catch (error) {
    console.error("✗ 数据库连接失败:", error);
    return false;
  }
}

// 执行查询
export async function query<T = any>(sql: string, values?: any[]): Promise<T> {
  const [results] = await pool.execute(sql, values);
  return results as T;
}

export default pool;
