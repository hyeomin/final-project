import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import theme from '../../../styles/theme';

const UserContents = styled.section`
  /* background-color: #f5e1ab; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 50%; */
  margin-bottom: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 10px;
  /* max-width: 1200px; */
  width: 100%;
  padding: 20px 0;
  /* margin-bottom: 10px; */

  & h1 {
    font-size: 26px;
    font-weight: 700;
  }
`;

const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;

  & p {
    color: ${theme.color.mangoMain};
    font-size: 17px;
    font-weight: 600;
  }

  & button {
    color: ${theme.color.gray};
    background-color: transparent;
    border-color: transparent;
    font-size: 16px;
  }
`;

const PostsSlide = styled.div`
  /* background-color: aqua; */
  display: flex;
  align-items: center;
  width: 100%;
`;

const ThumbnailsBox = styled.div`
  display: flex;
  /* background-color: aquamarine; */
  justify-content: center;
  width: 100%;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  position: relative;
  display: flex;
  border-radius: 20px;
  width: 285px;
  height: 408.462px;
  overflow: hidden;
  background-color: lightblue;
`;

const UserPostCover = styled(Link)`
  position: absolute;
  width: 100%;
  height: 100%;
  &:hover {
    filter: brightness(80%);
    transition: filter 0.3s ease;
  }
`;

const TextAndLikeButton = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 25px 20px;
`;

//커버이미지
const CoverImg = styled.img``;

const InfoTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  /* background-color: green; */
  height: 30px;
  align-self: flex-start;
`;
const UserInfo = styled.div`
  display: flex;
  // 닉네임
  & div:nth-child(2) {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 150%; /* 24px */
  }
  //프사
  & div:nth-child(1) {
    width: 25px;
    height: 25px;
    margin-right: 5px;
    color: #111;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
`;

const LikeButton = styled.button`
  background-color: transparent;
  border: none;
  width: 25px;
  height: 25px;
`;

const HeartIcon = styled(GoHeart)`
  color: #888888;
  font-size: 25px;
  cursor: pointer;
`;

const HeartFillIcon = styled(GoHeartFill)`
  color: red;
  font-size: 26px;
  cursor: pointer;
`;

const InfoBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const BottomText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  & div:nth-child(1) {
    width: 100%;
    height: 36px;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    text-align: left;
    font-size: 18px;
    font-weight: 700;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 15px; // 줄여도 될듯/ 피그마엔 20임
    /* background-color: red; */
  }
  & div:nth-child(2) {
    display: flex;
    width: 100%;
    height: 16px;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
    /* background-color: red; */
  }
`;
const Count = styled.div`
  display: flex;
  height: 16px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%; /* 21px */
  & span {
    display: flex;
    align-items: center;
    margin-right: 10px;
    & img {
      width: 16px;
      height: 16px;
      margin-right: 2px;
    }
  }
`;

const TopTenContainer = styled.div`
  width: 100%;
`;

export default {
  UserContents,
  TitleContainer,
  SubTitle,
  PostsSlide,
  ThumbnailsBox,
  StyledSwiperSlide,
  UserPostCover,
  TextAndLikeButton,
  LikeButton,
  HeartIcon,
  HeartFillIcon,
  InfoTop,
  UserInfo,
  InfoBottom,
  BottomText,
  Count,
  TopTenContainer,
  CoverImg
};
