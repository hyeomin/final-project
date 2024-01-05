import styled from 'styled-components';
import AboutMain from '../components/about/AboutMain';
import WhyMango from '../components/about/WhyMango';
import CS from './CommonStyle';

function About() {
  return (
    <CS.FullContainer>
      <AboutContainer>
        <Header>Header Image 요기 사진 들어갈 것</Header>
        <WhyMango />
        <AboutMain />
        <Bottom>
          <div>Left</div>
          <div>Right</div>
        </Bottom>
      </AboutContainer>
    </CS.FullContainer>
  );
}

export default About;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  row-gap: 10px;
  padding: 10px;
`;

const Header = styled.div`
  width: 100%;
  background-color: pink;
`;

const Bottom = styled.div`
  display: flex;
  column-gap: 30px;

  padding: 10px;
  background-color: pink;

  & div {
    background-color: lightblue;
  }
`;
