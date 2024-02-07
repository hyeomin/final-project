import React from 'react';
import './profileSkeleton.css';

const ProfileSkeleton = () => {
  return (
    <div className="skeleton-ProfileWrapper">
      <div className="skeleton-ProfileContainer">
        <div className="skeleton-ProfileImg"></div>
        <div className="skeleton-NicknameAndEmail">
          <div className="skeleton-UserNickname"></div>
          <div className="skeleton-UserEmail"></div>
        </div>
      </div>
      <div className="skeleton-UserActiveContainer">
        <div className="skeleton-ActiveBox">
          <div className="skeleton-ActiveTitle"></div>
          <div className="skeleton-ActiveContent"></div>
        </div>
        <div className="skeleton-ActiveBox">
          <div className="skeleton-ActiveTitle"></div>
          <div className="skeleton-ActiveContent"></div>
        </div>
        <div className="skeleton-ActiveBox">
          <div className="skeleton-ActiveTitle"></div>
          <div className="skeleton-ActiveContent"></div>
        </div>
      </div>
    </div>
  );
};
export default ProfileSkeleton;
