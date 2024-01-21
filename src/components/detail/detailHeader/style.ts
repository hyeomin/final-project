import styled from 'styled-components';
import { Swiper } from 'swiper/react';

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  background-color: white;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 400px;
  overflow: hidden;

  & img {
    object-fit: cover;
    object-position: cen;
  }
`;

interface PostTitleProps {
  noimage: string;
}

const PostTitle = styled.h3<PostTitleProps>`
  color: ${(props) => (props.noimage ? 'black' : 'white')};
  text-align: left;
  position: absolute;
  width: 100%;
  bottom: ${(props) => (props.noimage ? '20px' : '60px')};
  padding: ${(props) => (props.noimage ? '0 20px' : '0 60px')};
  font-size: 40px;
  cursor: initial;
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
  width: 85vw;
  top: 140px;
  position: absolute;
`;

const NoImage = styled.div`
  width: 100%;
  height: 100px;
`;

export default { CoverContainer, StyledSwiper, PostTitle, Gradient, NavigationButtonContainer, NoImage };
