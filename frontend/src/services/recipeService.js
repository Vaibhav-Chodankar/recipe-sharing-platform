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
