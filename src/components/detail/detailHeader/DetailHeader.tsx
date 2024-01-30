import { useState } from 'react';
import 'swiper/css';
import { SwiperClass, SwiperSlide } from 'swiper/react';
import swipeLeft from '../../../assets/icons/swipeLeft.png';
import swipeRight from '../../../assets/icons/swipeRight.png';
import useSwiperNavigation from '../../../hooks/useSwiperNavigation';
import { FoundDetailPostProps } from '../../../types/PostType';
import { convertToKor } from '../../write/common/lists';
import St from './style';

// interface Props {
//   foundDetailPost: PostType;
//   isLoading: boolean;
// }

function DetailHeader({ foundDetailPost }: FoundDetailPostProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const coverImages = foundDetailPost.coverImages;

  const { goNext, goPrev } = useSwiperNavigation({
    swiperInstance,
    currentIndex,
    // setCurrentIndex,
    maxIndex: coverImages.length - 1
  });

  // const handleSlideChange = (swiper: SwiperClass) => {
  //   setCurrentIndex(swiper.activeIndex);
  // };

  // const goNext = () => {
  //   if (swiperInstance) {
  //     swiperInstance.slideNext();
  //   }
  // };

  // const goPrev = () => {
  //   if (swiperInstance) {
  //     swiperInstance.slidePrev();
  //   }
  // };

  return (
    <St.CoverContainer>
      {/* {isLoading && <St.NoImage>로딩 중...</St.NoImage>} */}
      {coverImages.length > 0 ? (
        <>
          <St.StyledSwiper onSwiper={setSwiperInstance} className="mySwiper">
            {coverImages.map((image, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <img src={image.url} alt="cover" />
                  <St.Gradient></St.Gradient>
                  <St.PostHeaderInfo $noImage={false}>
                    <span>{convertToKor(foundDetailPost.category)}</span>
                    <h2>{foundDetailPost.title}</h2>
                  </St.PostHeaderInfo>
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
          <St.PostHeaderInfo $noImage={true}>{foundDetailPost.title}</St.PostHeaderInfo>
        </St.NoImage>
      )}
    </St.CoverContainer>
  );
}

export default DetailHeader;
