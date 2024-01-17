import styled from 'styled-components';
import theme from '../styles/theme';

function Footer() {
  return (
    <FooterContainer>
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
  height: 100px;
  padding: 30px 0;
`;
