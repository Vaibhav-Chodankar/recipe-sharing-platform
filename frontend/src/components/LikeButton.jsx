// src/components/LikeButton.js
import React from 'react';

function LikeButton({ likes, onLike }) {
    return (
        <div className="d-flex align-items-center my-3">
            <button className="btn btn-primary me-2" onClick={onLike}>
                Like
            </button>
            {/* Render the count of likes */}
            <span>{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</span>
        </div>
    );
}

export default LikeButton;
