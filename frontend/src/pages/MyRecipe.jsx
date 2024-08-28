import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DefaultImg from '../assets/recipe-placeholder.jpg';
import { getUserRecipes, deleteRecipe } from '../services/recipeService';
import { toast } from 'react-toastify';

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
                toast.error('Failed to fetch recipes. Please try again later.');
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
                toast.success('Recipe deleted successfully!');
            } catch (err) {
                console.error('Error deleting recipe:', err);
                toast.error('Failed to delete recipe. Please try again.');
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-recipe/${id}`);
    };

    return (
        <div className="container mt-5 pt-3">
            <h1>My Recipes</h1>
            {recipes.length === 0 ? (
                <p>You haven't added any recipes yet.</p>
            ) : (
                <div className="row">
                    {recipes.map(recipe => (
                        <div key={recipe._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm mb-4 h-100">
                                <img
                                    src={recipe.image ? `${recipe.image}` : DefaultImg}
                                    className="card-img-top"
                                    alt={recipe.title}
                                    style={{ objectFit: 'cover', height: '200px' }}
                                    onError={(e) => (e.target.src = DefaultImg)}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{recipe.title}</h5>
                                    <p className="card-text text-muted mb-2">Cooking Time: {recipe.cookingTime} minutes</p>
                                    <p className="card-text text-muted"><strong>Category:</strong> {recipe.category}</p>
                                    <div className="mt-auto d-flex justify-content-between">
                                        <button onClick={() => handleEdit(recipe._id)} className="btn btn-primary w-45">Edit</button>
                                        <button onClick={() => handleDelete(recipe._id)} className="btn btn-danger w-45">Delete</button>
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
