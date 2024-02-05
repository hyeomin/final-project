import React from 'react';
import './detailBodySkeleton.css';

const DetailBodySkeleton = () => {
  return (
    <>
      <div className="detailBody-skeleton-container">
        <div className="detailBody-skeleton-header">
          <div className="detailBody-skeleton-profile"></div>
          <div className="detailBody-skeleton-wrapper">
            <p className="detailBody-skeleton-displayName"></p>
            <p className="detailBody-skeleton-dateAndTime"></p>
          </div>
        </div>
      </div>
      <div className="detailBody-skeleton-shareInfo">
        <p className="detailBody-skeleton-counts"></p>
      </div>
    </>
  );
};

export default DetailBodySkeleton;
