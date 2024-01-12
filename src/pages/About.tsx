import styled from 'styled-components';
import AboutMain from '../components/about/AboutMain';
import WhyMango from '../components/about/WhyMango';

function About() {
  return (
    <AboutContainer>
      <Header>Header Image 요기 사진 들어갈 것</Header>
      <WhyMango />
      <AboutMain />
      <Bottom>
        <div>Left</div>
        <div>Right</div>
      </Bottom>
    </AboutContainer>
  );
}

export default About;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100vw;
  height: 400px;
  background-color: pink;
`;

const Bottom = styled.div`
  display: flex;
  column-gap: 30px;

  background-color: pink;

  & div {
    background-color: lightblue;
  }
`;
