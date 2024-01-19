import styled from 'styled-components';
import AboutMain from '../components/about/AboutMain';
import WhyMango from '../components/about/WhyMango';

function About() {
  return (
    <AboutContainer>
      <Header muted autoPlay loop>
        <source src={process.env.PUBLIC_URL + '/video/about-cover-video.mp4'} type="video/mp4" />
      </Header>
      <WhyMango />
      <AboutMain />
      {/* <Bottom>
        <div>Left</div>
        <div>Right</div>
      </Bottom> */}
    </AboutContainer>
  );
}

export default About;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.video`
  width: 100vw;
  height: 450px;
  object-fit: cover;
`;

const Bottom = styled.div`
  display: flex;
  column-gap: 30px;

  background-color: pink;

  & div {
    background-color: lightblue;
  }
`;
