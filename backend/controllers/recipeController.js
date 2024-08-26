const Recipe = require('../models/Recipe');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('user', 'name email');
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addRecipe = async (req, res) => {
    const { title, ingredients, steps, cookingTime, image } = req.body;

    try {
        const newRecipe = new Recipe({
            user: req.user.id,
            title,
            ingredients,
            steps,
            cookingTime,
            image,
        });

        const recipe = await newRecipe.save();
        res.status(201).json(recipe);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (recipe.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await recipe.remove();
        res.status(200).json({ message: 'Recipe removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
