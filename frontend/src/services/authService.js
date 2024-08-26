import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = (userData) => {
    return axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = (userData) => {
    return axios.post(`${API_URL}/auth/login`, userData);
};
