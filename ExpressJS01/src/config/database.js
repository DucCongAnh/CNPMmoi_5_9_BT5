require('dotenv').config();
const mysql = require('mysql2/promise');

const dbState = [{
  value: 0,
  label: "Disconnected"
}, {
  value: 1,
  label: "Connected"
}, {
  value: 2,
  label: "Connecting"
}, {
  value: 3,
  label: "Disconnecting"
}];

const connection = async () => {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    
    // Kiểm tra trạng thái kết nối
    const [rows, fields] = await pool.query('SELECT 1 + 1 AS solution');
    const state = rows[0].solution === 2 ? 1 : 0; // Đơn giản là kiểm tra kết nối thành công hay không
    console.log(dbState.find(f => f.value === state).label, "to database");
    
    return pool; // Trả về pool kết nối
  } catch (error) {
    console.error('Không thể kết nối với MySQL:', error.message);
    throw error;
  }
};

module.exports = connection;