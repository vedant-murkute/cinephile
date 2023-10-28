const pool = require('../database')

const getUserByUsername = async (username) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows;
};

const createUser = async (userData) => {
  try {
    const { username, email } = userData;
    const insertUserQuery = 'INSERT INTO users (username, email) VALUES (?, ?)';
    const [result] = await pool.execute(insertUserQuery, [username, email]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserByUsername, createUser
};