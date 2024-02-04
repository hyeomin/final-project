import React from 'react';
import './carouselSkeleton.css';

const CarouselSkeleton = () => {
  return (
    <div className="carousel-skeleton-container">
      <div className="skeleton-wrapper">
        <div className="skeleton-header">
          <div className="skeleton-profileImage"></div>
          <div className="skeleton-displayName"></div>
        </div>
        <div className="skeleton-footer">
          <div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>
          <div className="skeleton-counts"></div>
        </div>
      </div>{' '}
      <div className="skeleton-wrapper">
        <div className="skeleton-header">
          <div className="skeleton-profileImage"></div>
          <div className="skeleton-displayName"></div>
        </div>
        <div className="skeleton-footer">
          <div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>
          <div className="skeleton-counts"></div>
        </div>
      </div>{' '}
      <div className="skeleton-wrapper">
        <div className="skeleton-header">
          <div className="skeleton-profileImage"></div>
          <div className="skeleton-displayName"></div>
        </div>
        <div className="skeleton-footer">
          <div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>
          <div className="skeleton-counts"></div>
        </div>
      </div>{' '}
      <div className="skeleton-wrapper">
        <div className="skeleton-header">
          <div className="skeleton-profileImage"></div>
          <div className="skeleton-displayName"></div>
        </div>
        <div className="skeleton-footer">
          <div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>
          <div className="skeleton-counts"></div>
        </div>
      </div>
    </div>
  );
};

export default CarouselSkeleton;
