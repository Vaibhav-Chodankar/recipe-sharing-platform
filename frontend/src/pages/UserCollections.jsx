import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserCollections } from '../services/recipeService';

function UserCollections() {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(null); // State to manage active collection tab

    useEffect(() => {
        async function fetchCollections() {
            try {
                const { data } = await getUserCollections();
                
                // Sort collections by created date in descending order
                const sortedCollections = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                
                setCollections(sortedCollections);
                setActiveTab(sortedCollections.length > 0 ? sortedCollections[0]._id : null); // Set the first tab as active
                setLoading(false);
            } catch (err) {
                console.error('Error fetching collections:', err);
                setLoading(false);
            }
        }

        fetchCollections();
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Your Collections</h2>
            {collections.length === 0 ? (
                <p>No collections found. Start adding recipes to collections!</p>
            ) : (
                <>
                    {/* Tabs for Collections */}
                    <ul className="nav nav-tabs mb-4">
                        {collections.map((collection) => (
                            <li key={collection._id} className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === collection._id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(collection._id)}
                                >
                                    {collection.name}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Recipes for the active collection */}
                    {collections.map((collection) =>
                        activeTab === collection._id ? (
                            <div key={collection._id} className="tab-content">
                                {collection.recipes.length === 0 ? (
                                    <p>No recipes in this collection.</p>
                                ) : (
                                    <div className="row">
                                        {collection.recipes.map((recipe) => (
                                            <div key={recipe._id} className="col-md-4">
                                                <div className="card">
                                                    <Link to={`/recipe/${recipe._id}`}>
                                                        <img
                                                            src={recipe.image || 'https://via.placeholder.com/150'}
                                                            className="card-img-top"
                                                            alt={recipe.title}
                                                        />
                                                    </Link>
                                                    <div className="card-body">
                                                        <h5 className="card-title">
                                                            <Link to={`/recipe/${recipe._id}`}>{recipe.title}</Link>
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : null
                    )}
                </>
            )}
        </div>
    );
}

export default UserCollections;
