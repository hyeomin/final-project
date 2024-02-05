import React from 'react';
import './postCardSkeleton.css';
function PostCardSkeleton() {
  return (
    <div>
      <div className="skeleton-CardWrapper">
        <div className="skeleton-CardBox">
          <div className="skeleton-PostCardImg"></div>
          <div className="skeleton-DataBox">
            <div className="skeleton-UserImg"></div>
            <div className="skeleton-NicknameAndDate">
              <div className="skeleton-postCardNickname"></div>
              <div className="skeleton-postCardDate"></div>
            </div>
          </div>
          <div className="skeleton-TitleAndContent">
            <div className="skeleton-postCardTitle"></div>
            <div className="skeleton-postCardContent"></div>
          </div>
        </div>
        <div className="skeleton-CardBox">
          <div className="skeleton-PostCardImg"></div>
          <div className="skeleton-DataBox">
            <div className="skeleton-UserImg"></div>
            <div className="skeleton-NicknameAndDate">
              <div className="skeleton-postCardNickname"></div>
              <div className="skeleton-postCardDate"></div>
            </div>
          </div>
          <div className="skeleton-TitleAndContent">
            <div className="skeleton-postCardTitle"></div>
            <div className="skeleton-postCardContent"></div>
          </div>
        </div>
        <div className="skeleton-CardBox">
          <div className="skeleton-PostCardImg"></div>
          <div className="skeleton-DataBox">
            <div className="skeleton-UserImg"></div>
            <div className="skeleton-NicknameAndDate">
              <div className="skeleton-postCardNickname"></div>
              <div className="skeleton-postCardDate"></div>
            </div>
          </div>
          <div className="skeleton-TitleAndContent">
            <div className="skeleton-postCardTitle"></div>
            <div className="skeleton-postCardContent"></div>
          </div>
        </div>
        <div className="skeleton-CardBox">
          <div className="skeleton-PostCardImg"></div>
          <div className="skeleton-DataBox">
            <div className="skeleton-UserImg"></div>
            <div className="skeleton-NicknameAndDate">
              <div className="skeleton-postCardNickname"></div>
              <div className="skeleton-postCardDate"></div>
            </div>
          </div>
          <div className="skeleton-TitleAndContent">
            <div className="skeleton-postCardTitle"></div>
            <div className="skeleton-postCardContent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCardSkeleton;
