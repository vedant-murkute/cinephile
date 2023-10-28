const userModel = require('../models/userModel');

const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await userModel.getUserByUsername(username);

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = await userModel.createUser({ username, email });
    res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getUserByUsername, createUser
};