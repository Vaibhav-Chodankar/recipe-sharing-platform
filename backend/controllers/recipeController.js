const Recipe = require('../models/Recipe');
const User = require('../models/User')

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
        const recipe = await Recipe.findById(req.params.id)
            .populate('user', 'name email')
            .populate({
                path: 'comments.user',
                select: 'name email'
            });

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(recipe);
    } catch (err) {
        console.error('Error fetching recipe:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

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
            category,
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
        recipe.category = category; 

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

exports.likeRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('comments.user', 'name email');
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        const alreadyLiked = recipe.likes.some(like => like.user.toString() === req.user.id);

        if (alreadyLiked) {
            recipe.likes = recipe.likes.filter(like => like.user.toString() !== req.user.id);
        } else {
            recipe.likes.push({ user: req.user.id });
        }

        await recipe.save();
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.addCommentToRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body; 

        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        const newComment = {
            user: req.user.id, 
            text,
        };

        recipe.comments.push(newComment); 
        await recipe.save();

        const updatedRecipe = await Recipe.findById(id).populate('comments.user', 'name email');

        res.status(200).json(updatedRecipe);
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.addToCollection = async (req, res) => {
    const { collectionName } = req.body;
    const recipeId = req.params.id;

    try {
        const user = await User.findById(req.user.id); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let collection = user.collections.find(col => col.name === collectionName);
        if (!collection) {
            collection = { name: collectionName, recipes: [] };
            user.collections.push(collection);
            collection = user.collections[user.collections.length - 1]; 
        }

        if (!collection.recipes.some(recipe => recipe.equals(recipeId))) {
            collection.recipes.push(recipeId);
        } else {
            return res.status(400).json({ message: 'Recipe already in collection' });
        }

        await user.save();

        res.status(200).json({ message: 'Recipe added to collection', collection });
    } catch (err) {
        console.error('Error adding recipe to collection:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getUserCollections = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('collections.recipes', 'title image');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.collections);
    } catch (err) {
        console.error('Error fetching collections:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};