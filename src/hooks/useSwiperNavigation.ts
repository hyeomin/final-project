import { useState } from 'react';
import { SwiperClass } from 'swiper/react';

const useSwiperNavigation = (swiperInstance: SwiperClass | null, maxIndex: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return { currentIndex, goNext, goPrev };
};

export default useSwiperNavigation;
