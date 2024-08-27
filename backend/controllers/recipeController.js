const Recipe = require('../models/Recipe');
const fs = require('fs');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('user', 'name email');
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addRecipe = async (req, res) => {
    const { title, ingredients, steps, cookingTime } = req.body;

    let imageBase64 = null;

    if (req.file) {
        try {
            // Read the image file and convert it to Base64
            const imageBuffer = fs.readFileSync(req.file.path);
            imageBase64 = imageBuffer.toString('base64');

            fs.unlinkSync(req.file.path);
        } catch (err) {
            console.error('Error processing image:', err);
            return res.status(500).json({ message: 'Error processing image', error: err.message });
        }
    }

    try {
        const newRecipe = new Recipe({
            user: req.user.id,
            title,
            ingredients,
            steps,
            cookingTime,
            image: imageBase64,
        });

        const recipe = await newRecipe.save();
        res.status(201).json(recipe);
    } catch (err) {
        console.error('Error saving recipe:', err);
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
            return res.status(401).json({ message: 'User not authorized' });
        }

        await recipe.remove();
        res.status(200).json({ message: 'Recipe removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
