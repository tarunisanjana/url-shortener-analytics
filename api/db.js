const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres.xbrzlybsxchfkasqautu',
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  database: 'postgres',
  password: 'SANJANA@123',
  port: 6543,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;