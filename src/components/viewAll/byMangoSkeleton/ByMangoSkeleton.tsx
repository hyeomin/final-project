import React from 'react';
import './byMangoSkeleton.css';

const ByMangoSkeleton = () => {
  return (
    <>
      <div className="byMango-skeleton-wrapper">
        <div className="skeleton-coverImage"></div>
        <div className="byMango-skeleton-text">
          <div className="skeleton-title"></div>
          <div className="skeleton-content"></div>
        </div>
      </div>
      <div className="byMango-skeleton-wrapper">
        <div className="skeleton-coverImage"></div>
        <div className="byMango-skeleton-text">
          <div className="skeleton-title"></div>
          <div className="skeleton-content"></div>
        </div>
      </div>
      <div className="byMango-skeleton-wrapper">
        <div className="skeleton-coverImage"></div>
        <div className="byMango-skeleton-text">
          <div className="skeleton-title"></div>
          <div className="skeleton-content"></div>
        </div>
      </div>
    </>
  );
};

export default ByMangoSkeleton;
