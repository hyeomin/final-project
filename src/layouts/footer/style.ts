import styled from 'styled-components';
import theme from '../../styles/theme';

const FooterContainer = styled.div`
  background-color: ${theme.color.mangoLight};
  width: 100%;
  padding: 10px 120px;
  color: ${theme.color.gray};

  @media screen and (max-width: 431px) {
    display: none;
  }
  /* @media screen and (min-width: 376px) and (max-width: 620px) {
    display: none;
  } */
`;

const FooterContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  font-size: 14px;
  row-gap: 10px;
  padding: 25px 0;

  border-bottom: 0.5px solid ${theme.color.gray};
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
  row-gap: 5px;
  margin-right: -13px;
`;

const SingleMember = styled.div`
  display: flex;
  column-gap: 5px;
  padding: 0 15px;

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
