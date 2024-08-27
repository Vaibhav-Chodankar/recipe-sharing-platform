import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../services/recipeService';

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await getRecipeById(id);
                setRecipe(data);
            } catch (err) {
                console.error('Error fetching recipe:', err);
            }
        }
        fetchData();
    }, [id]);

    if (!recipe) return <div className="text-center mt-5">Loading...</div>;

    const recipeImage = recipe.image
        ? `${recipe.image}`
        : 'https://via.placeholder.com/600x400';

    return (
        <div className="container mt-5">
            <div className="card">
                <img src={recipeImage} className="card-img-top" alt={recipe.title} />
                <div className="card-body">
                    <h1 className="card-title">{recipe.title}</h1>
                    <hr />
                    <p className="card-text"><strong>Ingredients:</strong></p>
                    <p className="card-text">{recipe.ingredients}</p>
                    <p className="card-text"><strong>Steps:</strong></p>
                    <p className="card-text">{recipe.steps}</p>
                    <p className="card-text"><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
                    <p className="card-text"><strong>Category:</strong> {recipe.category}</p> {/* Display the category */}
                </div>
            </div>
        </div>
    );
}

export default RecipeDetail;
