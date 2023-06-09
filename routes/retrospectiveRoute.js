const express = require('express');
const router = express.Router();
const retrospectiveController = require('../controllers/retrospectiveController');

// rutas para gestionar las categorias
router.get('/category', retrospectiveController.getCategories);
router.post('/category', retrospectiveController.createCategory);
router.put('/category', retrospectiveController.updateCategory);

// Rutas para gestionar las tarjetas
router.post('/card', retrospectiveController.createCard);
router.get('/cards', retrospectiveController.getAllCards);
router.put('/card', retrospectiveController.updateCard);
router.delete('/card', retrospectiveController.deleteCard);
router.put('/card/like', retrospectiveController.updateLikes);
router.put('/card/comment', retrospectiveController.addComment);

module.exports = router;