import React from 'react';
import './homeAdminSkeleton.css';

const HomeAdminSkeleton = () => {
  return (
    <>
      <div className="skeleton-container">
        <div className="skeleton-h2"></div>
        <div className="skeleton-h1"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-button"></div>
        <div className="skeleton-slide"></div>
      </div>
    </>
  );
};

export default HomeAdminSkeleton;
