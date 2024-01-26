import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import aboutFooterImage from '../../../assets/about/about-footer.png';
import theme from '../../../styles/theme';

function AboutFooter() {
  const [index, setIndex] = useState(0);
  const categoryList = ['제품 추천', '노하우 공유', '제품 나눔', '습관 인증'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % categoryList.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AboutFooterContainer>
      <AboutFooterLeft>
        <h5>
          쉽고 재미있게 실천하는
          <br /> 친환경 라이프스타일
        </h5>
        <p>
          다양한 노하우와 정보 공유를 통해
          <br /> 환경 오염 함께 줄여나가요.
        </p>
      </AboutFooterLeft>
      <AboutFooterRight>
        <img src={aboutFooterImage} alt="about-footer" />
        <AnimatedCategory key={index}>{categoryList[index]}</AnimatedCategory>
      </AboutFooterRight>
    </AboutFooterContainer>
  );
}

export default AboutFooter;

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

// const AnimatedBoard = styled.div`
//   animation: ${swipeDown} 1s ease-in-out;
//   animation-fill-mode: forwards;
//   overflow: hidden;
//   height: 20px;
//   position: absolute;

//   font-size: 18px;
//   font-weight: bold;
// `;
