import styled from 'styled-components';
import theme from '../../../styles/theme';

const ViewAllContainer = styled.div`
  width: 1000px;
  min-height: 1544px;

  //모바일 세로
  @media screen and (max-width: 376px) {
    max-width: 370px;
    min-height: 485px;
    padding-left: 15px;
  }
`;

const MangoDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
  column-gap: 10px;

  //모바일 세로
  @media screen and (max-width: 376px) {
    margin-top: 25px;
  }
`;

const MangoWord = styled.p`
  color: ${theme.color.mangoMain};
  font-family: ${theme.font.mango};
  font-size: 38px;
  font-weight: 400;
  //모바일 세로
  @media screen and (max-width: 376px) {
    font-size: 28px;
  }
`;

const MangoOutWord = styled.p`
  color: #000;
  font-size: 38px;
  font-weight: 700;
  //모바일 세로
  @media screen and (max-width: 376px) {
    font-size: 28px;
  }
`;

const MangoSUbWord = styled.p`
  text-align: left;
  font-size: 17px;
  font-weight: 500;
  margin-top: 10px;

  //모바일 세로
  @media screen and (max-width: 376px) {
    /* line-height: 2;
    font-size: 15px; */
    display: none;
  }
`;

/*유저 등록 데이터 (친환경노하우~습관인증) */
const MainSubWrapper = styled.div`
  width: 100%;
  min-height: 485px;
  margin-bottom: 150px; //58에서 변경
  //모바일 세로
  @media screen and (max-width: 376px) {
    margin: auto;
  }
`;

export default {
  ViewAllContainer,
  MangoDiv,
  MangoWord,
  MangoOutWord,
  MangoSUbWord,
  MainSubWrapper
};
