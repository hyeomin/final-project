import styled from 'styled-components';
import theme from '../../styles/theme';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  background-color: ${theme.color.mangoLight};
  font-size: 14px;
  row-gap: 10px;

  row-gap: 10px;
  width: 100%;
  /* height: 280px; */
  padding: 40px 100px;
`;

const LogoWrapper = styled.div`
  width: 400px;
`;

const CopyrightBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #4a4a4a;
`;

const FooterText = styled.div`
  display: flex;
  flex-direction: column;

  & h5 {
    font-weight: bold;
    padding: 20px 0;
  }
`;

const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  row-gap: 5px;
  color: #4a4a4a;
  width: 400px;

  & p {
    font-weight: bold;
  }
`;

export default { FooterContainer, LogoWrapper, CopyrightBox, FooterText, TeamInfo };
