import React from 'react';
import './postsSkeleton.css';

const postsSkeleton = () => {
  return (
    <div className="posts-skeleton-container">
      <div className="posts-skeleton-card">
        <div className="posts-skeleton-coverImg"></div>
        <div className="posts-skeleton-infoWrapper">
          <div className="posts-skeleton-infoHeader">
            <div className="posts-skeleton-profile"></div>
            <div className="posts-skeleton-text">
              <div className="posts-skeleton-displayName"></div>
              <div className="posts-skeleton-dateAndTime"></div>
            </div>
          </div>
          <div className="posts-skeleton-contentWrapper">
            <div className="posts-skeleton-content"></div>
            <div className="posts-skeleton-content"></div>
          </div>

          <div className="posts-skeleton-counts"></div>
        </div>
      </div>
      <div className="posts-skeleton-card">
        <div className="posts-skeleton-coverImg"></div>
        <div className="posts-skeleton-infoWrapper">
          <div className="posts-skeleton-infoHeader">
            <div className="posts-skeleton-profile"></div>
            <div className="posts-skeleton-text">
              <div className="posts-skeleton-displayName"></div>
              <div className="posts-skeleton-dateAndTime"></div>
            </div>
          </div>
          <div className="posts-skeleton-contentWrapper">
            <div className="posts-skeleton-content"></div>
            <div className="posts-skeleton-content"></div>
          </div>

          <div className="posts-skeleton-counts"></div>
        </div>
      </div>
      <div className="posts-skeleton-card">
        <div className="posts-skeleton-coverImg"></div>
        <div className="posts-skeleton-infoWrapper">
          <div className="posts-skeleton-infoHeader">
            <div className="posts-skeleton-profile"></div>
            <div className="posts-skeleton-text">
              <div className="posts-skeleton-displayName"></div>
              <div className="posts-skeleton-dateAndTime"></div>
            </div>
          </div>
          <div className="posts-skeleton-contentWrapper">
            <div className="posts-skeleton-content"></div>
            <div className="posts-skeleton-content"></div>
          </div>

          <div className="posts-skeleton-counts"></div>
        </div>
      </div>
      <div className="posts-skeleton-card">
        <div className="posts-skeleton-coverImg"></div>
        <div className="posts-skeleton-infoWrapper">
          <div className="posts-skeleton-infoHeader">
            <div className="posts-skeleton-profile"></div>
            <div className="posts-skeleton-text">
              <div className="posts-skeleton-displayName"></div>
              <div className="posts-skeleton-dateAndTime"></div>
            </div>
          </div>
          <div className="posts-skeleton-contentWrapper">
            <div className="posts-skeleton-content"></div>
            <div className="posts-skeleton-content"></div>
          </div>

          <div className="posts-skeleton-counts"></div>
        </div>
      </div>
    </div>
  );
};

export default postsSkeleton;
