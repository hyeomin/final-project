import React, { useState, useEffect } from 'react';
import { GoChevronUp } from 'react-icons/go';
import styled from 'styled-components';

interface TopButtonProps {
  $position: number;
}

const TopButton = ({ $position }: TopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <StyledButton $position={$position} onClick={scrollToTop}>
          <GoChevronUp />
          TOP
        </StyledButton>
      )}
    </>
  );
};

const StyledButton = styled.button<TopButtonProps>`
  position: fixed;
  bottom: ${(props) => props.$position}px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(34, 34, 34, 0.5); 
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  z-index: 999;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 431px) {
    display: none;
  }
`;

export default TopButton;
