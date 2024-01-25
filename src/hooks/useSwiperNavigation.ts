import { SwiperClass } from 'swiper/react';

type Props = {
  swiperInstance: SwiperClass | null;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  maxIndex: number;
};

const useSwiperNavigation = ({ swiperInstance, currentIndex, setCurrentIndex, maxIndex }: Props) => {
  const goNext = () => {
    if (swiperInstance && currentIndex < maxIndex) {
      swiperInstance.slideNext();
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
    }
  };

  const goPrev = () => {
    if (swiperInstance && currentIndex > 0) {
      swiperInstance.slidePrev();
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  return { goNext, goPrev };
};

export default useSwiperNavigation;
