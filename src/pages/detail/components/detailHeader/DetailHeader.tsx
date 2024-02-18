import swipeLeft from 'assets/icons/swipeLeft.png';
import swipeRight from 'assets/icons/swipeRight.png';
import useSwiperNavigation from 'hooks/useSwiperNavigation';
import { useState } from 'react';
import 'swiper/css';
import { SwiperClass, SwiperSlide } from 'swiper/react';
import { FoundDetailPostProps } from 'types/PostType';

import { convertToKor } from 'pages/write/components/common/lists';
import St from './style';

function DetailHeader({ foundDetailPost }: FoundDetailPostProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  //혜민
  //커버이미지가 undefined일 경우, length의 길이를 확인하는데서 오류가 발생했음
  //[오류메시지]Uncaught TypeError: Cannot read properties of undefined (reading 'length')at DetailHeader (DetailHeader.tsx:23:1)
  //아래를 추가했는데 괜찮은가용?
  const coverImages = foundDetailPost.coverImages ?? [];

  // swiper custom hook
  const { goNext, goPrev } = useSwiperNavigation({
    swiperInstance,
    currentIndex,
    setCurrentIndex,
    maxIndex: coverImages.length - 1
  });

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.activeIndex);
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
