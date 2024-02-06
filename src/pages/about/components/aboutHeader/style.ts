import styled from 'styled-components';
import theme from 'types/styles/theme';

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 800px;

  @media screen and (max-width: 431px) {
    width: 100vw;
    height: 400px;
  }
`;

const VideoWrapper = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  row-gap: 60px;

  color: white;
  font-size: 80px;
  font-family: ${theme.font.mango};

  @media screen and (max-width: 431px) {
    font-size: 60px;
  }
`;

export default { Header, VideoWrapper, Title };
