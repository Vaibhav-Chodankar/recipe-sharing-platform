import React, { useEffect, useState } from 'react';
import DefaultImg from '../assets/recipe-placeholder.jpg';
import { useParams } from 'react-router-dom';
import { getRecipeById, likeRecipe, addCommentToRecipe } from '../services/recipeService';
import CommentSection from '../components/CommentSection';
import LikeButton from '../components/LikeButton';
import AddToCollection from '../components/AddToCollection';
import { toast } from 'react-toastify';

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await getRecipeById(id);
                setRecipe(data);
            } catch (err) {
                toast.error('Error fetching recipe.');
            }
        }
        fetchData();
    }, [id]);

    if (!recipe) return <div className="text-center mt-5">Loading...</div>;

    const recipeImage = recipe.image ? `${recipe.image}` : DefaultImg;

    const handleLike = async () => {
        try {
            const { data } = await likeRecipe(id);
            setRecipe(data);
        } catch (err) {
            if (err.response.status === 401 && err.response.data.message === "Token is not valid") {
                toast.info('Please log in to access this feature.');
            } else
                toast.error('Error liking recipe.');
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            const { data } = await addCommentToRecipe(id, { text: newComment });
            setRecipe(data);
            setNewComment('');
            toast.success('Comment added!');
        } catch (err) {
            if (err.response.status === 401 && err.response.data.message === "Token is not valid") {
                toast.info('Please log in to access this feature.');
            } else
                toast.error('Error adding comment.');
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row">
                <div className="col-lg-8 col-md-7">
                    <div className="card">
                        <img src={recipeImage} className="card-img-top img-fluid img-thumbnail" alt={recipe.title} />
                        <div className="card-body">
                            <h1 className="card-title">{recipe.title}</h1>
                            <hr />
                            <p className="card-text"><strong>Ingredients:</strong></p>
                            <p className="card-text">{recipe.ingredients}</p>
                            <p className="card-text"><strong>Steps:</strong></p>
                            <p className="card-text">{recipe.steps}</p>
                            <p className="card-text"><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
                            <p className="card-text"><strong>Category:</strong> {recipe.category}</p>

                            <LikeButton likes={recipe.likes} onLike={handleLike} />

                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-5">
                    <AddToCollection recipeId={id} />
                    <CommentSection
                        comments={recipe.comments || []}
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
