import styled from 'styled-components';
import theme from 'styles/theme';

const ByMangoContainer = styled.div`
  width: 1000px;
  /* min-height: 1544px; */

  //모바일 세로
  @media screen and (max-width: 431px) {
    width: 100%;
    margin-top: 30px;
  }
`;

const ByMangoTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 10px;
  column-gap: 10px;

  //모바일 세로
  @media screen and (max-width: 431px) {
    margin-top: 0;
  }
`;

const TextWithMangoFont = styled.h2`
  color: ${theme.color.mangoMain};
  font-family: ${theme.font.mango};
  font-size: 38px;
  font-weight: 400;
  //모바일 세로
  @media screen and (max-width: 431px) {
    font-size: 28px;
  }
`;

const TextWithoutMangoFont = styled.h2`
  /* color: #000; */
  font-size: 38px;
  font-weight: 700;
  //모바일 세로
  @media screen and (max-width: 431px) {
    font-size: 28px;
  }
`;

const ByMangoSubtitle = styled.p`
  text-align: left;
  font-size: 17px;
  font-weight: 500;
  margin-top: 15px;
  line-height: normal;

  //모바일 세로
  @media screen and (max-width: 431px) {
    font-size: 15px;
  }
`;

const PostListWrapper = styled.div`
  width: 100%;
  margin-bottom: 150px; //58에서 변경

  //모바일 세로
  @media screen and (max-width: 431px) {
    margin: auto;
  }
`;

export default {
  ByMangoContainer,
  ByMangoTitle,
  TextWithMangoFont,
  TextWithoutMangoFont,
  ByMangoSubtitle,
  PostListWrapper
};
