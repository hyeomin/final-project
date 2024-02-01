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
      swiperInstance.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };
  return { goNext, goPrev };
};

export default useSwiperNavigation;
