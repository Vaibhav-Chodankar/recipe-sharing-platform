// src/components/AddToCollection.js
import React, { useState } from 'react';
import { addToCollection } from '../services/recipeService';

function AddToCollection({ recipeId }) {
    const [collectionName, setCollectionName] = useState('');

    const handleAddToCollection = async () => {
        if (!collectionName.trim()) return; // Prevent empty collection names
        try {
            await addToCollection(recipeId, collectionName);
            setCollectionName(''); // Clear the input field
            alert('Recipe added to collection!');
        } catch (err) {
            console.error('Error adding recipe to collection:', err);
        }
    };

    return (
        <div className="my-3">
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Collection Name"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
            />
            <button className="btn btn-secondary" onClick={handleAddToCollection}>
                Add to Collection
            </button>
        </div>
    );
}

export default AddToCollection;
