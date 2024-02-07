import './homeHeaderSkeleton.css';

const HomeHeaderSkeleton = () => {
  return (
    <div className="skeleton-box">
      <div className="skeleton-container">
        <div>
          <div className="skeleton-headerText">
            <h2 className="skeleton-h2"></h2>
            <h1 className="skeleton-h1"></h1>
            <p className="skeleton-description"></p>
          </div>
          <div>
            <div className="skeleton-button"></div>
            <div className="skeleton-slide"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeaderSkeleton;
