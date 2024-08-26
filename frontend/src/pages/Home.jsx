import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { getAllRecipes } from '../services/recipeService';

function Home() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data } = await getAllRecipes();
            setRecipes(data);
        }
        fetchData();
    }, []);

    return (
        <div className="row">
            {recipes.map(recipe => (
                <div key={recipe._id} className="col-md-4">
                    <RecipeCard recipe={recipe} />
                </div>
            ))}
        </div>
    );
}

export default Home;
