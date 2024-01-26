import styled from 'styled-components';
import theme from '../../../styles/theme';

const UserContents = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1200px;
  margin-bottom: 10px;
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
`;

const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;

  & p {
    color: ${theme.color.mangoMain};
    font-size: 17px;
    font-weight: 600;
  }

  & button {
    color: ${theme.color.gray};
    background-color: transparent;
    border-color: transparent;
    font-size: 16px;
    cursor: pointer;
  }
`;

export default {
  UserContents,
  TitleContainer,
  SubTitle
};
