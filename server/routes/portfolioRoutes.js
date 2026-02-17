const express = require('express');
const router = express.Router();
const { getPortfolio, addToPortfolio, deleteFromPortfolio } = require('../controllers/portfolioController');
const { auth, admin } = require('../middleware/authMiddleware');

router.get('/', getPortfolio);
router.post('/', auth, admin, addToPortfolio);
router.delete('/:id', auth, admin, deleteFromPortfolio);

module.exports = router;
