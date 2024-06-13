// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const { users, addUser } = require('../database');

const login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
};

const register = (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    
    const newUser = addUser(username, password);
    res.status(201).json({ id: newUser.id, username: newUser.username });
};

const updateUser = (req, res) => {
    const { id } = req.user;
    const { username, password } = req.body;

    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (password) user.password = password;

    res.json({ message: 'User updated successfully', user });
};

const deleteUser = (req, res) => {
    const { id } = req.user;

    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);

    res.json({ message: 'User deleted successfully' });
};

module.exports = { login, register, updateUser, deleteUser };
