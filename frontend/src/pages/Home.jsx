import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { getAllRecipes } from '../services/recipeService';

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(6);

    const categories = [
        '--Filter Recipes--', 'Appetizers', 'Breakfast', 'Main Dishes', 'Side Dishes',
        'Desserts', 'Beverages', 'Salads', 'Soups', 'Snacks',
        'Sauces & Condiments', 'Vegetarian', 'Vegan'
    ];

    useEffect(() => {
        async function fetchData() {
            const { data } = await getAllRecipes();
            const sortedRecipes = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setRecipes(sortedRecipes);
            setFilteredRecipes(sortedRecipes);
        }
        fetchData();
    }, []);

    // Pagination
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle Search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        filterRecipes(e.target.value, category);
    };

    // Handle Category Filter
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        filterRecipes(searchTerm, e.target.value);
    };

    // Filter recipes by search term and category
    const filterRecipes = (searchTerm, category) => {
        let filtered = recipes;

        if (searchTerm) {
            filtered = filtered.filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (category && category !== '--Filter Recipes--') {
            filtered = filtered.filter(recipe => recipe.category === category);
        }

        setFilteredRecipes(filtered);
        setCurrentPage(1);

    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by recipe name..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <select className="form-control" value={category} onChange={handleCategoryChange}>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row">
                {currentRecipes.length > 0 ? (
                    currentRecipes.map(recipe => (
                        <div key={recipe._id} className="col-sm-6 col-md-4 mb-4">
                            <RecipeCard recipe={recipe} />
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-center">No recipes available.</p>
                    </div>
                )}
            </div>

            <div className="row">
                <div className="col">
                    <nav>
                        <ul className="pagination justify-content-center">
                            {[...Array(Math.ceil(filteredRecipes.length / recipesPerPage)).keys()].map(number => (
                                <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                                    <button onClick={() => paginate(number + 1)} className="page-link">
                                        {number + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Home;
