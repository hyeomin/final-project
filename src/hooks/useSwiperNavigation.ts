import { SwiperClass } from 'swiper/react';

type Props = {
  swiperInstance: SwiperClass | null;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  maxIndex: number;
};

const useSwiperNavigation = ({ swiperInstance, currentIndex, maxIndex }: Props) => {
  const goNext = () => {
    if (swiperInstance) {
      if (currentIndex === maxIndex) {
        swiperInstance.slideTo(0);
      } else {
        swiperInstance.slideNext();
      }
    }
  };

  const goPrev = () => {
    if (swiperInstance) {
      if (currentIndex === 0) {
        swiperInstance.slideTo(maxIndex);
      } else {
        swiperInstance.slidePrev();
      }
    }
  };
  return { goNext, goPrev };
};

export default useSwiperNavigation;
