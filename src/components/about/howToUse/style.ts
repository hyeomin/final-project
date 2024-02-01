import styled from 'styled-components';
import theme from '../../../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 60px;
  height: 2000px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
  font-family: ${theme.font.agroRegular};
  height: 300px;

  & p {
    font-size: 20px;
  }

  & h3 {
    font-family: ${theme.font.agroBold};
    font-size: 60px;
  }
`;

const UsageExplanation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 120px;
  padding: 20px 0;

  & img {
    width: 280px;
    object-fit: contain;
  }
`;

const Bubble = styled.div`
  width: 450px;
  position: relative;

  & img {
    width: 100%;
    object-fit: contain;
  }
`;

type StyleProps = {
  $left: boolean;
};

const TextInBubble = styled.div<StyleProps>`
  position: absolute;
  top: ${(props) => (props.$left ? '26%' : '12%')};
  left: ${(props) => (props.$left ? '21%' : '20%')};
  color: ${(props) => (props.$left ? 'white' : 'black')};
  width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 25px;

  h5 {
    font-weight: bold;
    font-size: 19px;
    line-height: 120%;
    width: 220px;
  }

  & p {
    width: 100%;
    line-height: 150%;
  }
`;

const HowtoUseNavBar = styled.div`
  display: flex;
  column-gap: 10px;

  & button {
    width: 150px;
  }
`;

export default { Container, Title, UsageExplanation, Bubble, TextInBubble, HowtoUseNavBar };
