const Recipe = require('../models/Recipe');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('user', 'name email');
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipes = await Recipe.findById(id).populate('user', 'name email');
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
}

exports.addRecipe = async (req, res) => {
    const { title, ingredients, steps, cookingTime, image, category } = req.body;

    try {
        let imageBase64 = null;

        if (image) {
            imageBase64 = image;
        }

        const newRecipe = new Recipe({
            user: req.user.id,
            title,
            ingredients,
            steps,
            cookingTime,
            image: imageBase64,
            category, // Add category here
        });

        const recipe = await newRecipe.save();
        res.status(201).json(recipe);
    } catch (err) {
        console.error('Error saving recipe:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getUserRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.user.id });
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateRecipe = async (req, res) => {
    const { title, ingredients, steps, cookingTime, image, category } = req.body;

    try {
        let recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Make sure the user owns the recipe
        if (recipe.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        recipe.title = title;
        recipe.ingredients = ingredients;
        recipe.steps = steps;
        recipe.cookingTime = cookingTime;
        recipe.category = category; // Update category here

        // Only update the image if a new one is provided
        if (image) {
            recipe.image = image;
        }

        await recipe.save();

        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (recipe.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await Recipe.deleteOne({ _id: req.params.id });

        res.json({ message: 'Recipe deleted' });
    } catch (err) {
        console.error('Error deleting recipe:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
