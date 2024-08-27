import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRecipes, deleteRecipe } from '../services/recipeService';

function MyRecipe() {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await getUserRecipes();
                setRecipes(data);
            } catch (err) {
                console.error('Error fetching recipes:', err);
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this recipe?');

        if (isConfirmed) {
            try {
                await deleteRecipe(id);
                setRecipes(recipes.filter(recipe => recipe._id !== id));
            } catch (err) {
                console.error('Error deleting recipe:', err);
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-recipe/${id}`); // Navigate to edit page with the recipe ID
    };

    return (
        <div className="container mt-5">
            <h1>My Recipes</h1>
            {recipes.length === 0 ? (
                <p>You haven't added any recipes yet.</p>
            ) : (
                <div className="row">
                    {recipes.map(recipe => (
                        <div key={recipe._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <img
                                    src={recipe.image ? `${recipe.image}` : 'https://via.placeholder.com/300'}
                                    className="card-img-top"
                                    alt={recipe.title}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.title}</h5>
                                    <p className="card-text text-muted">Cooking Time: {recipe.cookingTime} minutes</p>
                                    <p className="card-text"><strong>Category:</strong> {recipe.category}</p> {/* Display the category */}
                                    <div className="d-flex justify-content-between">
                                        <button onClick={() => handleEdit(recipe._id)} className="btn btn-primary">Edit</button>
                                        <button onClick={() => handleDelete(recipe._id)} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyRecipe;
