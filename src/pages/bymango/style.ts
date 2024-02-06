import styled from 'styled-components';
import theme from 'types/styles/theme';

const ByMangoContainer = styled.div`
  width: 1000px;

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

  @media screen and (max-width: 431px) {
    margin-top: 0;
  }
`;

const TextWithMangoFont = styled.h2`
  color: ${theme.color.mangoMain};
  font-family: ${theme.font.mango};
  font-size: 38px;
  font-weight: 400;

  @media screen and (max-width: 431px) {
    font-size: 28px;
  }
`;

const TextWithoutMangoFont = styled.h2`
  font-size: 38px;
<<<<<<< HEAD
  font-weight: 1000;
  //모바일 세로
=======
  font-weight: 700;

>>>>>>> d43cc8f769e147ee83660900e04b59e266c51346
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

  @media screen and (max-width: 431px) {
    font-size: 15px;
  }
`;

const PostListWrapper = styled.div`
  width: 100%;
  margin-bottom: 150px;

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
