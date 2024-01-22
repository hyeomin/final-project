import { useState } from 'react';
import 'swiper/css';
import { SwiperClass, SwiperSlide } from 'swiper/react';
import swipeLeft from '../../../assets/icons/swipeLeft.png';
import swipeRight from '../../../assets/icons/swipeRight.png';
import { FoundDetailPostProps } from '../../../types/PostType';
import St from './style';

function DetailHeader({ foundDetailPost }: FoundDetailPostProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const coverImages = foundDetailPost.coverImages;

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.activeIndex);
  };

  const goNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  return (
    <St.CoverContainer>
      {coverImages.length > 0 ? (
        <>
          <St.StyledSwiper onSwiper={setSwiperInstance} onSlideChange={handleSlideChange} className="mySwiper">
            {coverImages.map((image, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <img src={image.url} alt="cover" />
                  <St.Gradient></St.Gradient>
                  <St.PostTitle $noimage={false}>{foundDetailPost.title}</St.PostTitle>
                </SwiperSlide>
              );
            })}
          </St.StyledSwiper>
          <St.NavigationButtonContainer>
            <div onClick={goPrev}>{currentIndex > 0 && <img src={swipeLeft} alt="Previous" />}</div>
            <div onClick={goNext}>{currentIndex < coverImages.length - 1 && <img src={swipeRight} alt="Next" />}</div>
          </St.NavigationButtonContainer>
        </>
      ) : (
        <St.NoImage>
          <St.PostTitle $noimage={true}>{foundDetailPost.title}</St.PostTitle>
        </St.NoImage>
      )}
    </St.CoverContainer>
  );
}

export default DetailHeader;
