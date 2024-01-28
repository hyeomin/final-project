import styled from 'styled-components';
import TopButton from '../components/about/TopButton';
import WhyMango from '../components/about/WhyMango';
import AboutFooter from '../components/about/aboutFooter/AboutFooter';
import GetStarted from '../components/about/getStarted/GetStarted';
import HowToUse from '../components/about/howToUse/HowToUse';

function About() {
  return (
    <>
      <Header muted autoPlay loop>
        <source src={process.env.PUBLIC_URL + '/video/about-cover-video.webm'} type="video/mp4" />
      </Header>
      <WhyMango />
      <HowToUse />
      <GetStarted />
      <AboutFooter />
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
