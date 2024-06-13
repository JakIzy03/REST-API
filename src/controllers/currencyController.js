// src/controllers/currencyController.js
const axios = require('axios');
const { getExchangeRate } = require('../helpers/nbpApi');

const getCurrencies = async (req, res) => {
    try {
        const response = await axios.get('https://api.nbp.pl/api/exchangerates/tables/A/');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from NBP API' });
    }
};

const convertCurrency = async (req, res) => {
    const { fromCurrency, amount, toCurrency } = req.body;

    if (!fromCurrency || !amount || !toCurrency) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {
        const fromRate = fromCurrency === 'PLN' ? 1 : await getExchangeRate(fromCurrency);
        const toRate = toCurrency === 'PLN' ? 1 : await getExchangeRate(toCurrency);

        if (fromCurrency !== 'PLN' && toCurrency !== 'PLN') {
            return res.status(400).json({ message: 'One of the currencies must be PLN' });
        }

        const convertedAmount = fromCurrency === 'PLN'
            ? amount / toRate
            : (amount * fromRate) / toRate;

        res.status(200).json({ convertedAmount });
    } catch (error) {
        res.status(500).json({ message: 'Error converting currency', error });
    }
};

module.exports = { getCurrencies, convertCurrency };
