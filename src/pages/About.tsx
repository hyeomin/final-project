import styled from 'styled-components';
import AboutMain from '../components/about/AboutMain';
import WhyMango from '../components/about/WhyMango';
import TopButton from '../components/about/TopButton';

function About() {
  return (
    <>
      <Header muted autoPlay loop>
        <source src={process.env.PUBLIC_URL + '/video/about-cover-video.mp4'} type="video/mp4" />
      </Header>
      <WhyMango />
      <AboutMain />
      {/* <Bottom>
        <div>Left</div>
        <div>Right</div>
      </Bottom> */}
      <TopButton />
    </>
  );
}

export default About;

const Header = styled.video`
  width: 100%;
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
