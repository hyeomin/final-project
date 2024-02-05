import './carouselSkeleton.css';

const CarouselSkeleton = () => {
  return (
    <div className="carousel-skeleton-container">
      {/* 반응형 적용 */}
      <div className="skeleton-wrapper">
        <div className="skeleton-header">
          <div className="skeleton-profileImage"></div>
          <p className="skeleton-displayName"></p>
        </div>
        <div className="skeleton-footer">
          <div>
            <p className="skeleton-text"></p>
            <p className="skeleton-text"></p>
          </div>
          <div className="skeleton-counts"></div>
        </div>
      </div>
      <div className="skeleton-wrapper">
        <div className="skeleton-header">
          <div className="skeleton-profileImage"></div>
          <p className="skeleton-displayName"></p>
        </div>
        <div className="skeleton-footer">
          <div>
            <p className="skeleton-text"></p>
            <p className="skeleton-text"></p>
          </div>
          <div className="skeleton-counts"></div>
        </div>
      </div>
      <div className="skeleton-wrapper">
        <div className="skeleton-header">
          <div className="skeleton-profileImage"></div>
          <p className="skeleton-displayName"></p>
        </div>
        <div className="skeleton-footer">
          <div>
            <p className="skeleton-text"></p>
            <p className="skeleton-text"></p>
          </div>
          <div className="skeleton-counts"></div>
        </div>
      </div>
      <div className="skeleton-wrapper">
        <div className="skeleton-header">
          <div className="skeleton-profileImage"></div>
          <p className="skeleton-displayName"></p>
        </div>
        <div className="skeleton-footer">
          <div>
            <p className="skeleton-text"></p>
            <p className="skeleton-text"></p>
          </div>
          <div className="skeleton-counts"></div>
        </div>
      </div>
    </div>
  );
};

export default CarouselSkeleton;
