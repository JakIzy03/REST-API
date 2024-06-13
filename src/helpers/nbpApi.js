// src/helpers/nbpApi.js
const axios = require('axios');

const getExchangeRate = async (currency) => {
    try {
        const response = await axios.get(`http://api.nbp.pl/api/exchangerates/rates/a/${currency}/`);
        return response.data.rates[0].mid;
    } catch (error) {
        throw new Error('Error fetching exchange rate');
    }
};

module.exports = { getExchangeRate };
