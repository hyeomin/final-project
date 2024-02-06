import styled from 'styled-components';
import theme from 'types/styles/theme';

const WhyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  &::after {
    content: '';
    width: 100%;
    height: 300px;
    background: linear-gradient(to bottom, rgba(255, 161, 20, 1) 50%, rgba(255, 161, 20, 0) 100%);
  }

  @media screen and (max-width: 431px) {
    width: 100vw;
  }
`;

const Mission = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 100px;
  height: 800px;
  background-color: ${theme.color.mangoMain};

  & img {
    width: 390px;
  }

  @media screen and (max-width: 431px) {
    flex-direction: column;
    row-gap: 50px;
    & img {
      width: 200px;
    }
  }
`;

const Textbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 50px;

  @media screen and (max-width: 431px) {
    align-items: center;
  }
`;

const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  color: white;
  font-size: 36px;
  font-family: ${theme.font.agroBold};
  opacity: 80%;

  @media screen and (max-width: 431px) {
    font-size: 24px;
    text-align: center;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  color: #222222cc;
  font-size: 18px;
  /* background-color: lightblue; */

  & span {
    font-family: ${theme.font.agroBold};
  }

  @media screen and (max-width: 431px) {
    font-size: 16px;
    padding: 0 55px;
    text-align: center;
    line-height: 150%;
  }
`;

export default { WhyContainer, Mission, Textbox, SubTitle, Description };
