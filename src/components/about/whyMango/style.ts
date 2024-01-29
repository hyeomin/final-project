import styled from 'styled-components';
import theme from '../../../styles/theme';

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
`;

const Mission = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 100px;
  height: 800px;

  /* padding-top: 100px; */
  background-color: ${theme.color.mangoMain};

  & img {
    width: 390px;
  }
`;

const Textbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 50px;
`;

const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  color: white;
  font-size: 36px;
  font-family: ${theme.font.agroBold};
  opacity: 80%;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  color: #222222cc;
  font-size: 18px;

  & span {
    font-family: ${theme.font.agroBold};
  }
`;

export default { WhyContainer, Mission, Textbox, SubTitle, Description };
