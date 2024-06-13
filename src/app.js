// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const currencyRoutes = require('./routes/currencyRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const homeRoutes = require('./routes/homeRoutes');
const setupSwagger = require('./swagger');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());

app.use('/api', homeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/currency', currencyRoutes);
app.use('/api/transactions', transactionRoutes);

setupSwagger(app);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
