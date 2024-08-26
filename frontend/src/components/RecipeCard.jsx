import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">Cooking Time: {recipe.cookingTime}</p>
                <Link to={`/recipe/${recipe._id}`} className="btn btn-primary">View Recipe</Link>
            </div>
        </div>
    );
}

export default RecipeCard;
