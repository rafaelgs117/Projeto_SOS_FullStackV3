const { Pool } = require('pg');

const common = {
  connectionTimeoutMillis: 10000,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined,
};

const pool = process.env.DATABASE_URL
  ? new Pool({ ...common, connectionString: process.env.DATABASE_URL })
  : new Pool({
      ...common,
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'sos_emergencia',
    });

pool.on('error', (error) => {
  console.error('Erro inesperado no pool PostgreSQL:', error.message);
});

module.exports = pool;
