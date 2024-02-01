import styled from 'styled-components';
import theme from '../../../styles/theme';

const UserContents = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1200px;
  margin-bottom: 10px;

  @media screen and (max-width: 431px) {
    width: 100%;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 10px;
  width: 100%;
  padding: 20px 0;

  & h1 {
    font-size: 26px;
    font-weight: 700;
  }

  @media screen and (max-width: 431px) {
    width: 100%;
  }
`;

const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & p {
    color: ${theme.color.mangoMain};
    font-size: 17px;
    font-weight: 600;

    @media screen and (max-width: 431px) {
      font-size: 14px;
    }
  }

  & button {
    color: ${theme.color.gray};
    background-color: transparent;
    border-color: transparent;
    font-size: 16px;
    cursor: pointer;
    @media screen and (max-width: 431px) {
      font-size: 13px;
    }
  }
`;

export default {
  UserContents,
  TitleContainer,
  SubTitle
};
