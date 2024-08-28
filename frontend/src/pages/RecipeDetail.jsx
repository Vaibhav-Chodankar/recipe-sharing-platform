import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById, likeRecipe, addCommentToRecipe, addToCollection } from '../services/recipeService'; // Import necessary services
import CommentSection from '../components/CommentSection'; // Import CommentSection component
import LikeButton from '../components/LikeButton'; // Import LikeButton component
import AddToCollection from '../components/AddToCollection'; // Import AddToCollection component

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [newComment, setNewComment] = useState(''); // State for new comment

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

    const recipeImage = recipe.image ? `${recipe.image}` : 'https://via.placeholder.com/600x400';

    // Handle liking a recipe
    const handleLike = async () => {
        try {
            const { data } = await likeRecipe(id); // Get updated recipe data after like
            setRecipe(data); // Update state with new data
        } catch (err) {
            console.error('Error liking recipe:', err);
        }
    };

    // Handle adding a new comment
    const handleAddComment = async () => {
        if (!newComment.trim()) return; // Prevent empty comments
        try {
            const { data } = await addCommentToRecipe(id, { text: newComment }); // Get updated recipe data after adding a comment
            setRecipe(data); // Update state with new data
            setNewComment(''); // Clear the input field
        } catch (err) {
            console.error('Error adding comment:', err);
        }
    };

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
                    <p className="card-text"><strong>Category:</strong> {recipe.category}</p>

                    {/* Like Button Component */}
                    <LikeButton likes={recipe.likes} onLike={handleLike} />

                    {/* Add to Collection Component */}
                    <AddToCollection recipeId={id} />

                    {/* Comment Section Component */}
                    <CommentSection
                        comments={recipe.comments || []} // Ensure comments is an array
                        newComment={newComment}
                        setNewComment={setNewComment}
                        onAddComment={handleAddComment}
                    />
                </div>
            </div>
        </div>
    );
}

export default RecipeDetail;
