import React from 'react';
import './postsSkeleton.css';

const PostsSkeleton = () => {
  return (
    <div className="posts-skeleton-container">
      <div className="posts-skeleton-card">
        <div className="posts-skeleton-coverImg"></div>
        <div className="posts-skeleton-infoWrapper">
          <div className="posts-skeleton-infoHeader">
            <div className="posts-skeleton-profile"></div>
            <div className="posts-skeleton-text">
              <p className="posts-skeleton-displayName"></p>
              <p className="posts-skeleton-dateAndTime"></p>
            </div>
          </div>
          <div className="posts-skeleton-contentWrapper">
            <p className="posts-skeleton-content"></p>
            <p className="posts-skeleton-content"></p>
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
              <p className="posts-skeleton-displayName"></p>
              <p className="posts-skeleton-dateAndTime"></p>
            </div>
          </div>
          <div className="posts-skeleton-contentWrapper">
            <p className="posts-skeleton-content"></p>
            <p className="posts-skeleton-content"></p>
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
              <p className="posts-skeleton-displayName"></p>
              <p className="posts-skeleton-dateAndTime"></p>
            </div>
          </div>
          <div className="posts-skeleton-contentWrapper">
            <p className="posts-skeleton-content"></p>
            <p className="posts-skeleton-content"></p>
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
              <p className="posts-skeleton-displayName"></p>
              <p className="posts-skeleton-dateAndTime"></p>
            </div>
          </div>
          <div className="posts-skeleton-contentWrapper">
            <p className="posts-skeleton-content"></p>
            <p className="posts-skeleton-content"></p>
          </div>
          <div className="posts-skeleton-counts"></div>
        </div>
      </div>
    </div>
  );
};

export default PostsSkeleton;
