import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/icons/mango-logo.png';
import theme from '../styles/theme';
import { LogoContainer } from './NavBar';

function Footer() {
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <LogoContainer>
        <img src={logo} alt="logo" />
        <span onClick={() => navigate('/')}>Mango</span>
      </LogoContainer>
      <p>Copyrights All Reserved</p>
      <p>MANGO PROJECT</p>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.color.mangoYellow};

  row-gap: 10px;
  width: 100%;
  height: 150px;
  padding: 30px 0;
`;
