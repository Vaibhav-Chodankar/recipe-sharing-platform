import React, { useState } from 'react';
import { addToCollection } from '../services/recipeService';
import { toast } from 'react-toastify';

function AddToCollection({ recipeId }) {
    const [collectionName, setCollectionName] = useState('');

    const handleAddToCollection = async () => {
        if (!collectionName.trim()) {
            toast.warning('Please enter a collection name.');
            return;
        }

        try {
            await addToCollection(recipeId, collectionName);
            setCollectionName('');
            toast.success('Recipe added to collection!');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message === "Recipe already in collection") {
                toast.info('Recipe is already in this collection.');
            } else if (err.response.status === 401 && err.response.data.message === "Token is not valid") {
                toast.info('Please log in to access this feature.');
            } else {
                toast.error('Failed to add recipe to collection. Please try again.');
            }
        }
    };

    return (
        <div className="my-3 mb-5">
            <h5 className="mb-3">Add to collection</h5>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Collection Name"
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                />
                <button className="btn btn-secondary" onClick={handleAddToCollection}>
                    Add
                </button>
            </div>
        </div>
    );
}

export default AddToCollection;
