import { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import useSwiperNavigation from '../../../hooks/useSwiperNavigation';

import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import pageOne from '../../../assets/guide/1.png';
import pageTwo from '../../../assets/guide/2.png';
import pageThree from '../../../assets/guide/3.png';
import pageFour from '../../../assets/guide/4.png';
import pageFive from '../../../assets/guide/5.png';
import pageSix from '../../../assets/guide/6.png';
import theme from '../../../styles/theme';

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
            <GuideImage src={pageOne} alt="guide-one" />
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
        </Swiper>
        <NavigationButtonContainer>
          <NavButton onClick={goPrev}>
            {currentIndex > 0 && (
              <span>
                <GoChevronLeft />
              </span>
            )}
          </NavButton>
          <NavButton onClick={goNext}>
            {currentIndex < 6 && (
              <span>
                <GoChevronRight />
              </span>
            )}
          </NavButton>
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
  padding: 25px;
  width: 520px;
  height: 520px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const GuideImage = styled.img`
  object-fit: fill;
  border-radius: 10px;
`;

const NavigationButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 535px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const NavButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;

  & span {
    font-size: 40px;
    color: ${theme.color.gray};
  }
`;
