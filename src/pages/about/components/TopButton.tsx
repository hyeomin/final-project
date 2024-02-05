import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface TopButtonProps {
  position: number;
}

const TopButton = ({ position }: TopButtonProps) => {
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
        <StyledButton position={position} onClick={scrollToTop}>
          TOP
        </StyledButton>
      )}
    </>
  );
};

const StyledButton = styled.button<TopButtonProps>`
  position: fixed;
  bottom: ${(props) => props.position}px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: transparent;
  color: black;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  z-index: 999;
`;

export default TopButton;
