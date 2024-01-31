import styled from 'styled-components';
import { Swiper } from 'swiper/react';

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  /* background-color: white; */
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
  cursor: initial;

  display: flex;
  flex-direction: column;
  row-gap: 20px;
  font-size: 40px;

  & span {
    font-size: 20px;
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
