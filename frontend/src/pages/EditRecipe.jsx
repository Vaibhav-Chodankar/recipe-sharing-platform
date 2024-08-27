import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, updateRecipe } from '../services/recipeService';

function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: '',
        steps: '',
        cookingTime: '',
        image: '',
        category: 'Appetizers' // Default category value
    });

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const { data } = await getRecipeById(id);
                setRecipe(data);
            } catch (err) {
                console.error('Error fetching recipe:', err);
            }
        }
        fetchRecipe();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({
            ...recipe,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setRecipe({
                ...recipe,
                image: reader.result // Include the full base64 string with the prefix
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateRecipe(id, recipe);
            navigate('/my-recipes');
        } catch (err) {
            console.error('Error updating recipe:', err);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Edit Recipe</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={recipe.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="ingredients" className="form-label">Ingredients</label>
                    <textarea
                        className="form-control"
                        id="ingredients"
                        name="ingredients"
                        rows="3"
                        value={recipe.ingredients}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="steps" className="form-label">Steps</label>
                    <textarea
                        className="form-control"
                        id="steps"
                        name="steps"
                        rows="3"
                        value={recipe.steps}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cookingTime" className="form-label">Cooking Time</label>
                    <input
                        type="number"
                        className="form-control"
                        id="cookingTime"
                        name="cookingTime"
                        value={recipe.cookingTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                        className="form-control"
                        id="category"
                        name="category"
                        value={recipe.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="Appetizers">Appetizers</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Main Dishes">Main Dishes</option>
                        <option value="Side Dishes">Side Dishes</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Salads">Salads</option>
                        <option value="Soups">Soups</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Sauces & Condiments">Sauces & Condiments</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Recipe Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {recipe.image && (
                        <img
                            src={recipe.image} // Directly use the full base64 string as the image source
                            alt="Recipe"
                            className="img-thumbnail mt-3"
                            style={{ maxWidth: '300px' }}
                        />
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Update Recipe</button>
            </form>
        </div>
    );
}

export default EditRecipe;
