import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../services/recipeService';

function AddRecipe() {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [image, setImage] = useState(null); // New state for image
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('ingredients', ingredients);
            formData.append('steps', steps);
            formData.append('cookingTime', cookingTime);
            if (image) {
                formData.append('image', image);
            }
            await addRecipe(formData);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-sm" style={{ width: '500px' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Add New Recipe</h3>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                        <button type="submit" className="btn btn-primary w-100">Add Recipe</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddRecipe;
