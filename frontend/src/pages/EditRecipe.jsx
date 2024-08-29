import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, updateRecipe } from '../services/recipeService';
import { toast } from 'react-toastify';

function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: '',
        steps: '',
        cookingTime: '',
        image: '',
        category: 'Appetizers'
    });

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const { data } = await getRecipeById(id);
                setRecipe(data);
            } catch (err) {
                console.error('Error fetching recipe:', err);
                toast.error('Failed to fetch recipe. Please try again.');
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
                image: reader.result
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateRecipe(id, recipe);
            toast.success('Recipe updated successfully!');
            navigate('/my-recipes');
        } catch (err) {
            console.error('Error updating recipe:', err);
            toast.error('Failed to update recipe. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/my-recipes');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4 mt-5 pt-4 mb-5">
            <div className="card shadow p-4" style={{ maxWidth: '800px', width: '100%' }}>
                <h2 className="card-title text-center mb-4">Edit Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
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
                        <div className="col-md-6 mb-3">
                            <label htmlFor="cookingTime" className="form-label">Cooking Time (minutes)</label>
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
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select
                                className="form-select"
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
                        <div className="col-md-6 mb-3">
                            <label htmlFor="image" className="form-label">Recipe Image</label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                    {recipe.image && (
                        <div className="mb-3 text-center">
                            <img
                                src={recipe.image}
                                alt="Recipe"
                                className="img-thumbnail mt-3"
                                style={{ maxWidth: '300px', height: 'auto' }}
                            />
                        </div>
                    )}
                    <div className="d-flex">
                        <button type="submit" className="btn btn-primary m-1">Update Recipe</button>
                        <button type="button" className="btn btn-secondary m-1" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditRecipe;
