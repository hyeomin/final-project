import React from 'react';
import './detailBodySkeleton.css';

const DetailBodySkeleton = () => {
  return (
    <>
      <div className="detailBody-skeleton-container">
        <div className="skeleton-header">
          <div className="detailBody-skeleton-profile"></div>
          <div className="detailBody-skeleton-wrapper">
            <div className="detailBody-skeleton-displayName"></div>
            <div className="detailBody-skeleton-dateAndTime"></div>
          </div>
        </div>
      </div>
      <div className="detailBody-skeleton-shareInfo">
        <div className="detailBody-skeleton-counts"></div>
      </div>
    </>
  );
};

export default DetailBodySkeleton;
