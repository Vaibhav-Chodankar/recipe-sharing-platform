const express = require('express');
const { getAllRecipes, addRecipe, deleteRecipe } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/recipes', getAllRecipes);
router.post('/recipes/add', authMiddleware, addRecipe);
router.delete('/recipes/delete/:id', authMiddleware, deleteRecipe);

module.exports = router;
