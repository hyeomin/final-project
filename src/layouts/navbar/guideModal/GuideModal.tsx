import { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import swipeLeft from '../../../assets/about/swipe-left-white.png';
import swipeRight from '../../../assets/about/swipe-right-white.png';
import useSwiperNavigation from '../../../hooks/useSwiperNavigation';

import pageOne from '../../../assets/guide/1.png';
// import pageTwo from '../../../assets/guide/2.png';
// import pageThree from '../../../assets/guide/3.png';
// import pageFour from '../../../assets/guide/4.png';
// import pageFive from '../../../assets/guide/5.png';
// import pageSix from '../../../assets/guide/6.png';

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
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <StyledSwiper
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          spaceBetween={20}
          slidesPerView={3}
          pagination={{
            clickable: true
          }}
        >
          <SwiperSlide>
            <div>11</div>
            <img src={pageOne} alt="guide-one" />
          </SwiperSlide>
          {/* <SwiperSlide>
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
          </SwiperSlide> */}
        </StyledSwiper>
        <NavigationButtonContainer>
          <div onClick={goPrev}>{currentIndex > 0 && <img src={swipeLeft} alt="Previous" />}</div>
          <div onClick={goNext}>{currentIndex < 6 && <img src={swipeRight} alt="Next" />}</div>
        </NavigationButtonContainer>
      </ModalContent>
    </ModalBackdrop>
  );
}

export default GuideModal;

const ModalBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  padding: 20px;
  width: 500px;
  height: 500px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const StyledSwiper = styled(Swiper)`
  background-color: purple;
  display: flex;
  justify-content: center;

  & div {
    background-color: lightblue;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    border-radius: 30%;
  }
`;

const NavigationButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 82vw;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;

  & div {
    cursor: pointer;
  }

  & img {
    width: 25px;
  }
`;
