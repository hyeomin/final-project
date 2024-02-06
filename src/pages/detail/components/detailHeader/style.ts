import styled from 'styled-components';
import { Swiper } from 'swiper/react';

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 440px;
  border-radius: 10px;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: cen;
  }

  @media screen and (max-width: 431px) {
    height: 270px;
  }
`;

interface PostHeaderInfoProps {
  $noImage: boolean;
}

const PostHeaderInfo = styled.div<PostHeaderInfoProps>`
  color: ${(props) => (props.$noImage ? 'black' : 'white')};
  text-align: left;
  position: absolute;
  width: 100%;
  bottom: ${(props) => (props.$noImage ? '20px' : '40px')};
  padding: ${(props) => (props.$noImage ? '0 20px' : '0 60px')};
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  font-size: 40px;

  h2 {
    -webkit-user-select: text;
    user-select: text;
  }

  @media screen and (max-width: 431px) {
    row-gap: 10px;
    padding: 0 30px;
    font-size: 30px;
  }

  // 카테고리
  & span {
    -webkit-user-select: text;
    user-select: text;
    font-size: 20px;
    @media screen and (max-width: 431px) {
      font-size: 15px;
    }
  }
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 200px;
  opacity: 0.6;
  background: linear-gradient(rgba(0, 0, 0, 0) 20%, #000 100%);
`;

const NavigationButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95vw;
  top: 170px;
  position: absolute;
`;

const NoImage = styled.div`
  width: 100%;
  height: 120px;
  color: black;
`;

export default {
  CoverContainer,
  StyledSwiper,
  Gradient,
  NavigationButtonContainer,
  NoImage,
  PostHeaderInfo
};
