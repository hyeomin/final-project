import { useState } from 'react';
import styled from 'styled-components';

import HowToUse from './HowToUse';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NewsRoom from './NewsRoom';

type Section = '이용안내' | '뉴스룸' | '지금 시작하기';

function AboutMain() {
  const HOWTOUSE = '이용안내';
  const NEWSROOM = '뉴스룸';
  const GETSTARTED = '지금 시작하기';

  const [openSection, setOpenSection] = useState<Section>(HOWTOUSE);

  const onOpenToggleHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = event.currentTarget.textContent as Section;
    setOpenSection(buttonName);
  };

  return (
    <AboutMainContainer>
      <NavBar>
        <button onClick={onOpenToggleHandler}>이용안내</button>
        <button onClick={onOpenToggleHandler}>뉴스룸</button>
        <button onClick={onOpenToggleHandler}>지금 시작하기</button>
      </NavBar>
      {openSection === HOWTOUSE && <HowToUse />}
      {openSection === NEWSROOM && <NewsRoom />}
      {openSection === GETSTARTED && <StartNow>지금 시작하기</StartNow>}
    </AboutMainContainer>
  );
}

export default AboutMain;

const AboutMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;

  width: 800px;
  padding: 20px;

  background-color: pink;
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
