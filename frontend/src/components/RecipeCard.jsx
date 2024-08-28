import React from 'react';
import { Link } from 'react-router-dom';
import DefaultImg from '../assets/recipe-placeholder.jpg';
import { toast } from 'react-toastify';

function RecipeCard({ recipe }) {
    const defaultImage = DefaultImg;
    const recipeImage = recipe.image ? `${recipe.image}` : defaultImage;

    const handleImageError = () => {
        toast.error('Failed to load image, displaying default image instead.');
    };

    return (
        <div className="card shadow-sm mb-4 h-100">
            <img
                src={recipeImage}
                className="card-img-top"
                alt={recipe.title}
                onError={handleImageError}
                style={{ objectFit: 'cover', height: '200px' }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text text-muted mb-2">Cooking Time: {recipe.cookingTime} minutes</p>
                <p className="card-text text-muted"><strong>Category:</strong> {recipe.category}</p>
                <Link to={`/recipe/${recipe._id}`} className="mt-auto btn btn-primary w-100">View Recipe</Link>
            </div>
        </div>
    );
}

export default RecipeCard;
