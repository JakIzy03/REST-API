// src/database.js
const users = [
    { id: 1, username: 'user1', password: 'password1', role: 'user' },
    { id: 2, username: 'admin', password: 'adminpassword', role: 'admin' }
];

const transactions = [];

const addUser = (username, password, role = 'user') => {
    const id = users.length + 1;
    const newUser = { id, username, password, role };
    users.push(newUser);
    return newUser;
};

module.exports = { users, transactions, addUser };
