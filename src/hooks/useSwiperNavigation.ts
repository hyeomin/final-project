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
      currentIndex === maxIndex ? swiperInstance.slideTo(0) : swiperInstance.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperInstance) {
      currentIndex === 0 ? swiperInstance.slideTo(maxIndex) : swiperInstance.slidePrev();
    }
  };
  return { goNext, goPrev };
};

export default useSwiperNavigation;
