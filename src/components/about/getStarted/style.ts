import styled from 'styled-components';
import theme from '../../../styles/theme';

const GetStartedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 600px;

  @media screen and (max-width: 431px) {
    height: 700px;
  }
`;

const TabTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #666;
`;

const TabTitle = styled.div`
  width: 340px;
  border-radius: 20px 20px 0px 0px;
  background-color: ${theme.color.mangoMain};

  & h3 {
    text-align: center;
    display: flex;
    justify-content: center;
    color: white;
    font-family: ${theme.font.agroBold};
    font-size: 24px;
    padding: 10px;
  }

  @media screen and (max-width: 431px) {
    width: 250px;
  }
`;

const ColoredBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  background-color: ${theme.color.mangoMain};
  width: 100%;
  height: 340px;
  padding: 60px 180px;
  color: white;
  position: relative;

  & h5 {
    font-size: 26px;
    font-weight: bold;
  }

  @media screen and (max-width: 431px) {
    padding: 40px;
    height: 370px;
    h5 {
      font-size: 20px;
    }
  }
`;

const Subtitle = styled.div`
  display: flex;
  align-items: end;
  column-gap: 10px;
`;

const LinkContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  width: 100%;
  height: 370px;
  margin: 30px 0;
  border-radius: 10px;

  @media screen and (max-width: 431px) {
    grid-template-columns: 1fr;
    row-gap: 20px;
    height: 470px;
  }
`;

const LinktoPage = styled.div`
  background-color: ${theme.color.mangoMain};
  overflow: hidden;
  padding: 5px;
  border-radius: 10px;

  @media screen and (max-width: 431px) {
    height: 100%;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  & h5 {
    position: absolute;
    bottom: 40px;
    left: 40px;
  }
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  opacity: 0.6;
  background: linear-gradient(rgba(0, 0, 0, 0) 10%, #000 100%);
  border-radius: 10px;
`;

export default {
  ImageContainer,
  GetStartedContainer,
  TabTitle,
  ColoredBox,
  Subtitle,
  LinkContainer,
  LinktoPage,
  Gradient,
  TabTitleContainer
};
