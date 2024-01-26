import styled from 'styled-components';
import aboutFooterImage from '../assets/about/about-footer.png';
import GetStarted from '../components/about/GetStarted';
import HowToUse from '../components/about/HowToUse';
import TopButton from '../components/about/TopButton';
import WhyMango from '../components/about/WhyMango';
import theme from '../styles/theme';

function About() {
  return (
    <>
      <Header muted autoPlay loop>
        <source src={process.env.PUBLIC_URL + '/video/about-cover-video.webm'} type="video/mp4" />
      </Header>
      <WhyMango />
      <HowToUse />
      {/* <NewsRoom /> */}
      <GetStarted />
      <AboutFooter>
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
        </AboutFooterRight>
      </AboutFooter>
      <TopButton />
    </>
  );
}

export default About;

const Header = styled.video`
  width: 100%;
  height: 800px;
  object-fit: cover;
`;

const AboutFooter = styled.div`
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

  & img {
    width: 100%;
  }
`;
