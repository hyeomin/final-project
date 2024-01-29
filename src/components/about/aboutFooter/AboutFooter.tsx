import { useEffect, useState } from 'react';
import aboutFooterImage from '../../../assets/about/about-footer.png';
import St from './style';

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
    <St.AboutFooterContainer>
      <St.AboutFooterLeft>
        <h5>
          쉽고 재미있게 실천하는
          <br /> 친환경 라이프스타일
        </h5>
        <p>
          다양한 노하우와 정보 공유를 통해
          <br /> 환경 오염 함께 줄여나가요.
        </p>
      </St.AboutFooterLeft>
      <St.AboutFooterRight>
        <img src={aboutFooterImage} alt="about-footer" />
        <St.AnimatedCategory key={index}>{categoryList[index]}</St.AnimatedCategory>
      </St.AboutFooterRight>
    </St.AboutFooterContainer>
  );
}

export default AboutFooter;
