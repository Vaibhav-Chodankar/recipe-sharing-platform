const express = require('express');
const { getAllRecipes, addRecipe, deleteRecipe, getRecipeById, getUserRecipes, updateRecipe,likeRecipe,addCommentToRecipe,addToCollection,getUserCollections } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/recipes', getAllRecipes);
router.get('/recipes/:id', getRecipeById);
router.post('/recipes/add', authMiddleware, addRecipe);
router.get('/my-recipes', authMiddleware, getUserRecipes);
router.put('/edit-recipe/:id', authMiddleware, updateRecipe);
router.delete('/delete-recipe/:id', authMiddleware, deleteRecipe);
router.post('/recipes/:id/like', authMiddleware, likeRecipe);
router.post('/recipes/:id/comments', authMiddleware, addCommentToRecipe);
router.post('/recipes/:id/add-to-collection', authMiddleware, addToCollection);
router.get('/collections', authMiddleware, getUserCollections);

module.exports = router;
