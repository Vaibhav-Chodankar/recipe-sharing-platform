import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
    const defaultImage = 'https://via.placeholder.com/150';
    const recipeImage = recipe.image ? `${recipe.image}` : defaultImage;

    return (
        <div className="card shadow-sm mb-4" style={{ width: '18rem' }}>
            <img src={recipeImage} className="card-img-top" alt={recipe.title} />
            <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text text-muted">Cooking Time: {recipe.cookingTime} minutes</p>
                <p className="card-text text-muted"><strong>Category:</strong> {recipe.category}</p> {/* Display the category */}
                <Link to={`/recipe/${recipe._id}`} className="btn btn-primary w-100">View Recipe</Link>
            </div>
        </div>
    );
}

export default RecipeCard;
