const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    steps: {
        type: String,
        required: true,
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        enum: [
            'Appetizers',
            'Breakfast',
            'Main Dishes',
            'Side Dishes',
            'Desserts',
            'Beverages',
            'Salads',
            'Soups',
            'Snacks',
            'Sauces & Condiments',
            'Vegetarian',
            'Vegan'
        ],
        required: true,
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        },
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            text: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
