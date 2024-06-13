// src/routes/homeRoutes.js
const express = require('express');
const { chuck } = require('../controllers/homeController');
const router = express.Router();

router.get('/chuck', chuck);

/**
 * @swagger
 * /api/chuck:
 *   get:
 *     summary: Get random joke from chuck norris API
 *     tags: [Chuck]
 *     responses:
 *       200:
 *         description: Successful response with joke
 *       500:
 *         description: Server error
 */

module.exports = router;