import { useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/mango-logo.png';
import { LogoContainer } from '../navbar/style';
import St from './style';

function Footer() {
  const navigate = useNavigate();

  return (
    <St.FooterContainer>
      <St.LogoWrapper>
        <LogoContainer>
          <img src={logo} alt="logo" />
          <span onClick={() => navigate('/')}>Mango</span>
        </LogoContainer>
      </St.LogoWrapper>
      <St.CopyrightBox>
        <p>Copyrights All Reserved</p>
        <p>MANGO PROJECT</p>
      </St.CopyrightBox>
      <St.FooterText>
        <St.TeamInfo>
          <h5>PROJECT INFO</h5>
          <p>Team Infinity</p>
          <span>Ashley && Hailey && Kim && Soli</span>
          {/* <span>Hailey</span>
          <span>Kim</span>
          <span>Soli</span> */}
        </St.TeamInfo>
      </St.FooterText>
    </St.FooterContainer>
  );
}

export default Footer;
