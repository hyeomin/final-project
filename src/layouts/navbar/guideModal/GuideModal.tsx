import { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import useSwiperNavigation from 'hooks/useSwiperNavigation';

import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import pageOne from 'assets/guide/1.png';
import pageTwo from 'assets/guide/2.png';
import pageThree from 'assets/guide/3.png';
import pageFour from 'assets/guide/4.png';
import pageFive from 'assets/guide/5.png';
import pageSix from 'assets/guide/6.png';
import St from './style';

type ModalProps = {
  onClose: () => void;
};

function GuideModal({ onClose }: ModalProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 커스텀 Swiper handler
  const { goNext, goPrev } = useSwiperNavigation({
    swiperInstance,
    currentIndex,
    setCurrentIndex,
    maxIndex: 6
  });

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.activeIndex);
  };

  return (
    <St.ModalBackdrop onClick={onClose}>
      <St.ModalContent onClick={(e) => e.stopPropagation()}>
        <Swiper
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            clickable: true
          }}
        >
          <SwiperSlide>
            <St.GuideImage src={pageOne} alt="guide-one" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pageTwo} alt="guide-two" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pageThree} alt="guide-three" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pageFour} alt="guide-four" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pageFive} alt="guide-five" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pageSix} alt="guide-six" />
          </SwiperSlide>
          <St.NavigationButtonContainer>
            <St.NavButton onClick={goPrev}>
              {currentIndex > 0 && (
                <span>
                  <GoChevronLeft />
                </span>
              )}
            </St.NavButton>
            <St.NavButton onClick={goNext}>
              {currentIndex < 5 && (
                <span>
                  <GoChevronRight />
                </span>
              )}
            </St.NavButton>
          </St.NavigationButtonContainer>
          <St.PageCount>{`${currentIndex + 1} / 6`}</St.PageCount>
        </Swiper>
      </St.ModalContent>
    </St.ModalBackdrop>
  );
}

export default GuideModal;
