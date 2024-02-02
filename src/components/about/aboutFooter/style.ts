import styled, { keyframes } from 'styled-components';
import theme from '../../../styles/theme';

const AboutFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  height: 800px;

  @media screen and (max-width: 431px) {
    width: 100%;
    height: 600px;
    flex-direction: column;
    justify-content: center;
    row-gap: 50px;
  }
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

  @media screen and (max-width: 431px) {
    row-gap: 10px;
    & h5 {
      font-size: 26px;
    }

    & p {
      font-size: 14px;
    }
  }
`;

const AboutFooterRight = styled.div`
  width: 580px;
  position: relative;

  & img {
    width: 100%;
  }
  @media screen and (max-width: 431px) {
    width: 300px;
  }
`;

const swipeUp = keyframes`
  from {
    transform: translateY(80%);
  }
  to {
    transform: translateY(-50%);
  }


`;

const AnimatedCategory = styled.div`
  animation: ${swipeUp} 1s ease-in-out;
  animation-fill-mode: forwards;
  overflow: hidden;
  position: absolute;
  left: 230px;
  top: 147px;
  font-size: 22px;
  font-weight: bold;
  @media screen and (max-width: 431px) {
    left: 120px;
    top: 73px;
    font-size: 14px;
  }
`;

export default { AboutFooterContainer, AboutFooterLeft, AboutFooterRight, AnimatedCategory };
