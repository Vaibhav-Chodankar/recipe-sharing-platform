import React from 'react';

function LikeButton({ likes, onLike }) {
    const handleLike = () => {
        onLike();
    };

    return (
        <div className="d-flex align-items-center my-3">
            <button
                className="btn btn-outline-primary me-2"
                onClick={handleLike}
                style={{ minWidth: '100px' }}
            >
                👍 Like
            </button>
            <span className="ms-2">
                {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
            </span>
        </div>
    );
}

export default LikeButton;
