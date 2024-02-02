import styled from 'styled-components';
import { Swiper } from 'swiper/react';
import theme from '../../../styles/theme';

const NewsRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TabTitle = styled.div`
  width: 340px;
  border-radius: 20px 20px 0px 0px;
  background-color: #666;

  & h3 {
    text-align: center;
    line-height: 100%;
    color: white;
    font-family: ${theme.font.agroBold};
    font-size: 24px;
    padding: 10px;
  }

  @media screen and (max-width: 431px) {
    width: 250px;
  }
`;

const SwiperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 50px;
  width: 100%;
  height: 690px;
  padding: 60px 180px;
  background-color: #666;
  position: relative;

  @media screen and (max-width: 431px) {
    height: 670px;
    padding: 60px;
  }
`;

const NewsRoomTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 15px;
  color: white;

  & h4 {
    font-size: 26px;
    font-weight: 700;
  }

  & span {
    font-size: 18px;
  }

  @media screen and (max-width: 431px) {
    h4 {
      font-size: 20px;
    }
    & span {
      font-size: 16px;
    }
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 340px;

  @media screen and (max-width: 431px) {
  }
`;

const SingleSlide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: -2px 0px 6px 0px rgba(0, 0, 0, 0.15), 2px 4px 6px 0px rgba(0, 0, 0, 0.15);
  background-color: white;
  padding: 5px;

  & img {
    width: 100%;
    height: 55%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const NewsInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;
  padding: 12px;
  flex: 1;

  & span {
    font-size: 15px;
    color: ${theme.color.gray};
  }

  & strong {
    font-size: 18px;
    font-weight: 600;
    color: black;
    text-align: left;
  }
`;

const NavigationButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;

  & div {
    cursor: pointer;
  }

  & img {
    width: 25px;
  }

  @media screen and (max-width: 431px) {
    width: 80vw;

    & img {
      width: 20px;
    }
  }
`;

export default {
  NewsRoomContainer,
  TabTitle,
  NavigationButtonContainer,
  NewsInfo,
  StyledSwiper,
  SingleSlide,
  NewsRoomTitle,
  SwiperContainer
};
