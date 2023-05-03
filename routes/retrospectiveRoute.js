const express = require('express');
const router = express.Router();
const retrospectiveController = require('../controllers/retrospectiveController');


router.get('/', retrospectiveController.searchProducts);

module.exports = router;