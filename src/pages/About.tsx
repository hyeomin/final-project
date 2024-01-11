import styled from 'styled-components';
import AboutMain from '../components/about/AboutMain';
import WhyMango from '../components/about/WhyMango';
import theme from '../styles/theme';

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

  row-gap: 10px;

  background-color: ${theme.color.mangoMain};
`;

const Header = styled.div`
  width: 100%;
  height: 400px;
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
