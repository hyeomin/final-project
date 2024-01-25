import React, { useState, useCallback } from 'react';

interface CarouselNavigation {
  currentSlide: number;
  handlePrev: () => void;
  handleNext: () => void;
}

export const useCarouselNavigation = (totalItems: number, itemsPerPage: number): CarouselNavigation => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prevIndex) => (prevIndex - itemsPerPage < 0 ? 0 : prevIndex - itemsPerPage));
  };

  const handleNext = () => {
    setCurrentSlide((prevIndex) => (prevIndex + itemsPerPage >= totalItems ? prevIndex : prevIndex + 4));
  };

  return { currentSlide, handlePrev, handleNext };
};
