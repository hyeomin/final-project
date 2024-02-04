import React from 'react';
import './communitySkeleton.css';

const CommunitySkeleton = () => {
  return (
    <>
      <div className="community-skeleton-card">
        card
        <div className="community-skeleton-coverImg">cover</div>
        <div className="community-skeleton-infoWrapper">
          <div className="community-skeleton-infoHeader">
            <div className="community-skeleton-profile"></div>
            <div className="community-skeleton-text">
              <div className="community-skeleton-displayName"></div>
              <div className="community-skeleton-dateAndTime"></div>
            </div>
          </div>
          <div className="community-skeleton-content"></div>
          <div className="community-skeleton-counts"></div>
        </div>
      </div>
    </>
  );
};

export default CommunitySkeleton;
