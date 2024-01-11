import styled from 'styled-components';

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

  row-gap: 10px;
  background-color: pink;
`;
