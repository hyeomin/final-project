import './commentSkeleton.css';

const CommentSkeleton = () => {
  return (
    <div className="comment-skeleton-container">
      <div className="comment-skeleton-wrapper">
        <div className="comment-skeleton-userInfo">
          <div className="comment-skeleton-profile"></div>
          <p className="comment-skeleton-text"></p>
        </div>
        <p className="comment-skeleton-content"></p>
      </div>
    </div>
  );
};

export default CommentSkeleton;
