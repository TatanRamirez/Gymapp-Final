const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

let pool;

console.log(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE)

const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      timezone: 'local',
    });
  }
  return await pool.getConnection();
};
module.exports = {
  getConnection,
};
