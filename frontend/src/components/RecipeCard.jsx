import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
    // Default image in case the recipe doesn't have one
    const defaultImage = 'https://via.placeholder.com/150';
    const recipeImage = recipe.image ? `data:image/jpeg;base64,${recipe.image}` : defaultImage;

    return (
        <div className="card shadow-sm mb-4" style={{ width: '18rem' }}>
            <img src={recipeImage} className="card-img-top" alt={recipe.title} />
            <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text text-muted">Cooking Time: {recipe.cookingTime} minutes</p>
                <Link to={`/recipe/${recipe._id}`} className="btn btn-primary w-100">View Recipe</Link>
            </div>
        </div>
    );
}

export default RecipeCard;
