// src/routes/currencyRoutes.js
const express = require('express');
const { getCurrencies, convertCurrency } = require('../controllers/currencyController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/rates', authMiddleware, getCurrencies);

/**
 * @swagger
 * /api/currency/rates:
 *   get:
 *     summary: Get currency rates from NBP API
 *     tags: [Currency]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with currency rates
 *       401:
 *         description: Unauthorized
 */

router.post('/converter', convertCurrency);

/**
 * @swagger
 * /api/currency/converter:
 *   post:
 *     summary: Convert currency
 *     tags: [Currency]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromCurrency:
 *                 type: string
 *                 example: "USD"
 *               amount:
 *                 type: number
 *                 example: 100
 *               toCurrency:
 *                 type: string
 *                 example: "PLN"
 *     responses:
 *       200:
 *         description: Conversion successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 convertedAmount:
 *                   type: number
 *       400:
 *         description: Invalid input
 */

module.exports = router;
