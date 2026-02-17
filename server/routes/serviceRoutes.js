const express = require('express');
const router = express.Router();
const { getServices, createService, updateService, deleteService } = require('../controllers/serviceController');
const { auth, admin } = require('../middleware/authMiddleware');

router.get('/', getServices);
router.post('/', auth, admin, createService);
router.put('/:id', auth, admin, updateService);
router.delete('/:id', auth, admin, deleteService);

module.exports = router;
