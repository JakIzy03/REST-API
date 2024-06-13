// src/routes/transactionRoutes.js
const express = require('express');
const { getAllTransactions, createTransaction } = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

router.get('/all', authMiddleware, getAllTransactions);

/**
 * @swagger
 * /api/transactions/all:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with all transactions
 *       401:
 *         description: Unauthorized
 */

router.post('/createTransaction', authMiddleware, createTransaction);

/**
 * @swagger
 * /api/transactions/createTransaction:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - fromCurrency
 *               - fromAccount
 *               - amount
 *               - toCurrency
 *               - toAccount
 *             properties:
 *               userId:
 *                 type: integer
 *               fromCurrency:
 *                 type: string
 *               fromAccount:
 *                 type: string
 *               amount:
 *                 type: number
 *               toCurrency:
 *                 type: string
 *               toAccount:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

module.exports = router;
