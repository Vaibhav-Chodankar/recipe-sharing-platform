import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../services/recipeService';
import { toast } from 'react-toastify';

function AddRecipe() {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('Appetizers');
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                title,
                ingredients,
                steps,
                cookingTime,
                image,
                category,
            };

            await addRecipe(formData);
            toast.success("New recipe added successfully")
            navigate('/');
        } catch (err) {
            console.error(err);
            toast.error("Failed to add new recipe")
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4 mt-5 pt-4 mb-5">
            <div className="card shadow-sm p-4" style={{ maxWidth: '600px', width: '100%' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Add New Recipe</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ingredients" className="form-label">Ingredients</label>
                            <textarea
                                className="form-control"
                                id="ingredients"
                                rows="3"
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="steps" className="form-label">Steps</label>
                            <textarea
                                className="form-control"
                                id="steps"
                                rows="3"
                                value={steps}
                                onChange={(e) => setSteps(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cookingTime" className="form-label">Cooking Time (minutes)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="cookingTime"
                                value={cookingTime}
                                onChange={(e) => setCookingTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Recipe Image</label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select
                                className="form-select"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
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
                        <button type="submit" className="btn btn-primary w-100 mt-3">Add Recipe</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddRecipe;
