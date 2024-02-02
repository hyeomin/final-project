import { useNavigate } from 'react-router-dom';
import github from '../../assets/icons/github-icon.png';
import logo from '../../assets/icons/mango-logo.png';
import { LogoContainerFooter } from '../navbar/style';
import St from './style';

function Footer() {
  const navigate = useNavigate();

  return (
    <St.FooterContainer>
      <St.FooterContentContainer>
        <St.LogoWrapper>
          <LogoContainerFooter>
            <img src={logo} alt="logo" />
            <span onClick={() => navigate('/')}>Mango</span>
          </LogoContainerFooter>
        </St.LogoWrapper>
        <St.FooterText>
          <p>내일배움캠프 | 스파르타코딩클럼 | 팀스파르타</p>
          <p>A8 Team Infinity</p>
          <St.TeamInfo>
            <St.SingleMember>
              <span>김혜민 Kim</span>
              <a href="https://github.com/zerotonine2da" target="_blank" rel="noopener noreferrer">
                <img src={github} alt="github" />
              </a>
            </St.SingleMember>
            <span>|</span>
            <St.SingleMember>
              <span>박솔이 Soli</span>
              <a href="https://github.com/Solyi-Park" target="_blank" rel="noopener noreferrer">
                <img src={github} alt="github" />
              </a>
            </St.SingleMember>
            <span>|</span>
            <St.SingleMember>
              <span>박혜민 Ashley</span>
              <a href="https://github.com/hyeomin" target="_blank" rel="noopener noreferrer">
                <img src={github} alt="github" />
              </a>
            </St.SingleMember>
            <span>|</span>
            <St.SingleMember>
              <span>박희원 Hailey</span>
              <a href="https://github.com/heeneeee" target="_blank" rel="noopener noreferrer">
                <img src={github} alt="github" />
              </a>
            </St.SingleMember>
          </St.TeamInfo>
        </St.FooterText>
      </St.FooterContentContainer>
      <St.CopyrightBox>MANGO PROJECT © Copyrights All Reserved</St.CopyrightBox>
    </St.FooterContainer>
  );
}

export default Footer;
