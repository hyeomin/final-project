import './homeHeaderSkeleton.css';

const HomeHeaderSkeleton = () => {
  return (
    <>
      <div className="skeleton-container">
        <h2 className="skeleton-h2"></h2>
        <h1 className="skeleton-h1"></h1>
        <p className="skeleton-description"></p>
        <div className="skeleton-button"></div>
        <div className="skeleton-slide"></div>
      </div>
    </>
  );
};

export default HomeHeaderSkeleton;
