import mysql from 'mysql2/promise';

let pool;

export function getDb() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'ratesour_rateldb',
      user: process.env.DB_USER || 'ratesour_root',
      password: process.env.DB_PASSWORD,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });
  }
  return pool;
}
