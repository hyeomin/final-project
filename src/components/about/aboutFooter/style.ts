import styled, { keyframes } from 'styled-components';
import theme from '../../../styles/theme';

const AboutFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  height: 800px;
`;

const AboutFooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  & h5 {
    font-size: 32px;
    font-family: ${theme.font.agroBold};
    line-height: 125%;
  }

  & p {
    line-height: 150%;
  }
`;

const AboutFooterRight = styled.div`
  width: 580px;
  position: relative;

  & img {
    width: 100%;
  }
`;

const swipeUp = keyframes`
  from {
    transform: translateY(80%);
  }
  to {
    transform: translateY(-60%);
  }
`;

const AnimatedCategory = styled.div`
  animation: ${swipeUp} 1s ease-in-out;
  animation-fill-mode: forwards;
  overflow: hidden;
  height: 20px;
  position: absolute;
  left: 230px;
  top: 147px;
  font-size: 22px;
  font-weight: bold;
`;

export default { AboutFooterContainer, AboutFooterLeft, AboutFooterRight, AnimatedCategory };
