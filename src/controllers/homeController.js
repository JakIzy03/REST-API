// src/controllers/homeRoutes.js
const axios = require('axios');

const chuck = async (req, res) => {
    try {
        const response = await axios.get('https://api.chucknorris.io/jokes/random');
        res.json(response.data.value);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data.value from Chuck Norris API' });
    }
};

module.exports = { chuck };
