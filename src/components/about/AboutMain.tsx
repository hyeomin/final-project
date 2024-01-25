import styled from 'styled-components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import theme from '../../styles/theme';
import HowToUse from './HowToUse';
import YoutubeTest from './YoutubeTest';

const HOWTOUSE = '이용안내';
const NEWSROOM = '뉴스룸';
const GETSTARTED = '지금 시작하기';

type Section = typeof HOWTOUSE | typeof NEWSROOM | typeof GETSTARTED;

function AboutMain() {
  // const [openSection, setOpenSection] = useState<Section>(HOWTOUSE);

  // const onOpenToggleHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   const buttonName = event.currentTarget.textContent as Section;
  //   setOpenSection(buttonName);
  // };

  return (
    <AboutMainContainer>
      <Title>
        <p>망고만의 건강한 생활습관을 만드는 우리의 원칙</p>
        <h3>WE MAKE</h3>
        <h3>ECO LIFESTYLE </h3>
      </Title>
      <HowToUse />
      <YoutubeTest />
      {/* <NavBar>
        <button onClick={onOpenToggleHandler}>{HOWTOUSE}</button>
        <button onClick={onOpenToggleHandler}>{NEWSROOM}</button>
        <button onClick={onOpenToggleHandler}>{GETSTARTED}</button>
      </NavBar>
      {openSection === HOWTOUSE && <HowToUse />}
      {openSection === NEWSROOM && <YoutubeTest />}
      {openSection === GETSTARTED && <StartNow>지금 시작하기</StartNow>} */}
    </AboutMainContainer>
  );
}

export default AboutMain;

const AboutMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  height: 1600px;
  margin: 180px 0;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
  font-family: ${theme.font.agroRegular};
  height: 35%;

  & p {
    font-size: 20px;
  }

  & h3 {
    font-family: ${theme.font.agroBold};
    font-size: 60px;
  }
`;

const NavBar = styled.div`
  display: flex;
  column-gap: 10px;

  background-color: lightblue;

  & button {
    width: 140px;
  }
`;

const StartNow = styled.div`
  background-color: lightblue;
`;
