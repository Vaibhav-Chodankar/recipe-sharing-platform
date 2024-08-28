import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllRecipes = () => {
    return axios.get(`${API_URL}/recipes`);
};

export const getRecipeById = (id) => {
    return axios.get(`${API_URL}/recipes/${id}`);
};

export const addRecipe = (recipeData) => {
    const token = localStorage.getItem('token');
    return axios.post(`${API_URL}/recipes/add`, recipeData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateRecipe = (id, updatedRecipe) => {
    return axios.put(`${API_URL}/edit-recipe/${id}`, updatedRecipe, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const getUserRecipes = () => {
    return axios.get(`${API_URL}/my-recipes`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const deleteRecipe = (id) => {
    return axios.delete(`${API_URL}/delete-recipe/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const likeRecipe = (id) => {
    return axios.post(
        `${API_URL}/recipes/${id}/like`, 
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
};

export const addCommentToRecipe = (id, comment) => {
    return axios.post(
        `${API_URL}/recipes/${id}/comments`,
        comment,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
};

export const addToCollection = (recipeId, collectionName) => {
    return axios.post(
        `${API_URL}/recipes/${recipeId}/add-to-collection`,
        { collectionName },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
};

export const getUserCollections = () => {
    return axios.get(`${API_URL}/collections`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
};