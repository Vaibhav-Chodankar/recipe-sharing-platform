// src/components/CommentSection.js
import React from 'react';

function CommentSection({ comments, newComment, setNewComment, onAddComment }) {
    return (
        <div className="mt-4">
            <h5>Comments</h5>
            {comments.length === 0 ? ( // Check if there are no comments
                <p className="text-muted">No comments yet. Be the first to comment!</p>
            ) : (
                <ul className="list-group">
                    {comments.map((comment) => (
                        <li key={comment._id} className="list-group-item">
                            {/* Safely access user name and comment text */}
                            <strong>{comment.user?.name || 'Anonymous'}</strong>: {comment.text}
                        </li>
                    ))}
                </ul>
            )}
            
            <div className="mt-3">
                <textarea
                    className="form-control mb-2"
                    rows="2"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="btn btn-primary" onClick={onAddComment}>
                    Add Comment
                </button>
            </div>
        </div>
    );
}

export default CommentSection;
