import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserCollections } from '../services/recipeService';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import DefaultImg from '../assets/recipe-placeholder.jpg';
import Loader from '../components/Loader';

const TabContainer = styled.ul`
    display: flex;
    border-bottom: 2px solid #ddd;
    margin-bottom: 20px;
    padding: 0;
    list-style: none;
    overflow-x: auto;
`;

const TabButton = styled.button`
    background-color: ${({ active }) => (active ? '#007bff' : 'white')};
    color: ${({ active }) => (active ? 'white' : '#007bff')};
    border: none;
    padding: 10px 20px;
    margin-right: 10px;
    border-radius: 5px 5px 0 0;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: ${({ active }) => (active ? '#0056b3' : '#e9ecef')};
        color: ${({ active }) => (active ? 'white' : '#0056b3')};
    }

    &:focus {
        outline: none;
    }
`;

const TabContent = styled.div`
    margin-top: 20px;
`;

function UserCollections() {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(null);

    useEffect(() => {
        async function fetchCollections() {
            try {
                const { data } = await getUserCollections();
                const sortedCollections = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setCollections(sortedCollections);
                setActiveTab(sortedCollections.length > 0 ? sortedCollections[0]._id : null);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching collections:', err);
                toast.error('Failed to load collections. Please try again.');
                setLoading(false);
            }
        }

        fetchCollections();
    }, []);

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center"> <Loader/> </div>;
    }

    return (
        <div className="container mt-5 pt-5">
            <h2 className="mb-4">Your Collections</h2>
            {collections.length === 0 ? (
                <p>No collections found. Start adding recipes to collections!</p>
            ) : (
                <>
                    <TabContainer>
                        {collections.map((collection) => (
                            <li key={collection._id}>
                                <TabButton
                                    active={activeTab === collection._id}
                                    onClick={() => setActiveTab(collection._id)}
                                >
                                    {collection.name}
                                </TabButton>
                            </li>
                        ))}
                    </TabContainer>

                    {collections.map((collection) =>
                        activeTab === collection._id ? (
                            <TabContent key={collection._id}>
                                {collection.recipes.length === 0 ? (
                                    <p>No recipes in this collection.</p>
                                ) : (
                                    <div className="row">
                                        {collection.recipes.map((recipe) => (
                                            <div key={recipe._id} className="col-md-4 col-sm-6 mb-4">
                                                <div className="card h-100 shadow-sm">
                                                    <Link to={`/recipe/${recipe._id}`}>
                                                        <img
                                                            src={recipe.image || DefaultImg}
                                                            className="card-img-top"
                                                            alt={recipe.title}
                                                            style={{ objectFit: 'cover', height: '200px' }}
                                                        />
                                                    </Link>
                                                    <div className="card-body d-flex flex-column">
                                                        <h5 className="card-title">
                                                            <Link to={`/recipe/${recipe._id}`} className="text-decoration-none text-dark">
                                                                {recipe.title}
                                                            </Link>
                                                        </h5>
                                                        <Link to={`/recipe/${recipe._id}`} className="btn btn-primary mt-auto">
                                                            View Recipe
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </TabContent>
                        ) : null
                    )}
                </>
            )}
        </div>
    );
}

export default UserCollections;
