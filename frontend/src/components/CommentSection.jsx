import React from 'react';

function CommentSection({ comments, newComment, setNewComment, onAddComment }) {
    return (
        <div className="mt-4">
            <h5 className="mb-3">Comments</h5>

            {comments.length === 0 ? (
                <p className="text-muted">No comments yet. Be the first to comment!</p>
            ) : (
                <ul className="list-group mb-3">
                    {comments.map((comment) => (
                        <li key={comment._id} className="list-group-item border-0 bg-light mb-2 rounded">
                            <div className="d-flex justify-content-between">
                                <strong className="me-2">{comment.user?.name || 'Anonymous'}</strong>
                                <span className="text-muted small">{new Date(comment.date).toLocaleDateString()}</span>
                            </div>
                            <p className="mb-0">{comment.text}</p>
                        </li>
                    ))}
                </ul>
            )}

            <div className="comment-input">
                <textarea
                    className="form-control mb-2 shadow-sm"
                    rows="3"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{ resize: 'none' }}
                />
                <button
                    className="btn btn-primary w-100 shadow-sm"
                    onClick={onAddComment}
                >
                    Add Comment
                </button>
            </div>
        </div>
    );
}

export default CommentSection;
