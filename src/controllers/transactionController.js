// src/controllers/transactionController.js
const { transactions } = require('../database');
const { getExchangeRate } = require('../helpers/nbpApi');


const getAllTransactions = (req, res) => {
    res.json(transactions);
};

const createTransaction = async (req, res) => {
    const { userId, fromCurrency, fromAccount, amount, toCurrency, toAccount } = req.body;

    if (!userId || !fromCurrency || !fromAccount || !amount || !toCurrency || !toAccount) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (fromCurrency !== 'PLN' && toCurrency !== 'PLN') {
        return res.status(400).json({ message: 'One of the currencies must be PLN' });
    }

    try {
        const fromRate = fromCurrency === 'PLN' ? 1 : await getExchangeRate(fromCurrency);
        const toRate = toCurrency === 'PLN' ? 1 : await getExchangeRate(toCurrency);

        const convertedAmount = fromCurrency === 'PLN'
            ? amount / toRate
            : (amount * fromRate) / toRate;

        const transaction = {
            id: transactions.length + 1,
            userId,
            fromCurrency,
            fromAccount,
            amount,
            toCurrency,
            toAccount,
            convertedAmount,
            rate: toRate,
            date: new Date(),
        };

        transactions.push(transaction);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllTransactions, createTransaction };
