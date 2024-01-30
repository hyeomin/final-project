import styled from 'styled-components';
import theme from '../../styles/theme';

const FooterContainer = styled.div`
  background-color: ${theme.color.mangoLight};
  width: 100%;
  padding: 10px 120px;
  color: black;
`;

const FooterContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  font-size: 14px;
  row-gap: 10px;
  padding: 25px 0;

  border-bottom: 1px solid black;
`;

const LogoWrapper = styled.div`
  width: 400px;
`;

const FooterText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  row-gap: 15px;
`;

const TeamInfo = styled.div`
  display: flex;
  align-items: end;
  column-gap: 20px;
  row-gap: 5px;
`;

const SingleMember = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  width: 110px;

  & img {
    width: 12px;
    height: 12px;
  }
`;

const CopyrightBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  align-items: baseline;
  font-size: 14px;
  padding: 20px 0;
`;

export default {
  SingleMember,
  FooterContentContainer,
  FooterContainer,
  LogoWrapper,
  CopyrightBox,
  FooterText,
  TeamInfo
};
