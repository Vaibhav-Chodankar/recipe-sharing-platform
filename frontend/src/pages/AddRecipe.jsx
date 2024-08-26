import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../services/recipeService';

function AddRecipe() {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newRecipe = { title, ingredients, steps, cookingTime };
            await addRecipe(newRecipe);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
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
                <label htmlFor="cookingTime" className="form-label">Cooking Time</label>
                <input
                    type="text"
                    className="form-control"
                    id="cookingTime"
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Recipe</button>
        </form>
    );
}

export default AddRecipe;
