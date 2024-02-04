import './commentSkeleton.css';

const CommentSkeleton = () => {
  return (
    <div className="comment-skeleton-container">
      <div className="comment-skeleton-userInfo">
        <div className="comment-skeleton-profile"></div>
        <div className="comment-skeleton-text"></div>
      </div>
      <div className="comment-skeleton-content"></div>
    </div>
  );
};

export default CommentSkeleton;
