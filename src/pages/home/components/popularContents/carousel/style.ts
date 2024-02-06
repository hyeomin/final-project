import { GoHeart, GoHeartFill } from 'react-icons/go';
import styled, { css } from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 1300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;

  @media screen and (max-width: 431px) {
    width: 100%;
  }
`;
const PlaceHolder = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
`;

const SlideWrapper = styled.div`
  display: flex;
  width: 1200px;
  height: 406px;
  margin: 0 35px;
  gap: 20px;

  @media screen and (max-width: 431px) {
    width: 100%;
    margin: 0 40px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const Slide = styled.div`
  position: relative;
  width: 285px;
  height: 400px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 13px 20px 20px;
  transition: opacity 0.5s ease;
  overflow: hidden;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 15%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent);
    z-index: 2;
    top: 0;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
    z-index: 2;
    bottom: 0;
  }
  @media screen and (max-width: 431px) {
    position: relative;
    padding: 10px 10px 10px;
    display: flex;
  }
`;

const CoverImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  @media screen and (max-width: 431px) {
    size: 30px;
  }
`;

const SlideHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 25px;
  z-index: 5;
  & div {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }
  & button {
    all: unset;
    font-size: 21px;
    color: #fff;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const HeartIcon = styled(GoHeart)`
  color: #fff;
  font-size: 25px;
  cursor: pointer;
  @media screen and (max-width: 431px) {
    font-size: 15px;
  }
`;

const HeartFillIcon = styled(GoHeartFill)`
  color: red;
  font-size: 26px;
  cursor: pointer;

  @media screen and (max-width: 431px) {
    font-size: 16px;
  }
`;

const UserProfileImage = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  @media screen and (max-width: 431px) {
    width: 20px;
    height: 20px;
  }
`;

const UserProfileName = styled.div`
  @media screen and (max-width: 431px) {
    & span {
      font-size: 12px;
    }
  }
`;

const SlideBottom = styled.div`
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const TitleAndContent = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  & h1 {
    color: #fff;
    height: 36px;
    font-size: 18px;
    font-weight: 700;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: left;
    @media screen and (max-width: 431px) {
      font-size: 12px;
    }
  }
  & div {
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media screen and (max-width: 431px) {
      font-size: 10px;
    }
  }
`;
const InteractionInfo = styled.div`
  display: flex;
  gap: 10px;
  & div {
    display: flex;
    align-items: center;
    gap: 2px;
    color: #fff;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    @media screen and (max-width: 431px) {
      font-size: 10px;
    }
  }
`;

type ButtonProps = {
  $buttonType: 'prev' | 'next';
};
const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  all: unset;
  font-size: 35px;
  color: #000;
  cursor: pointer;
  &:hover {
    color: #e3e3e3;
  }

  ${(props) =>
    props.$buttonType === 'prev' &&
    css`
      position: absolute;
      left: 0;
    `}

  ${(props) =>
    props.$buttonType === 'next' &&
    css`
      position: absolute;
      right: 0;
    `}
`;

export default {
  Container,
  PlaceHolder,
  SlideWrapper,
  CoverImage,
  Slide,
  UserProfileImage,
  UserProfileName,
  SlideHeader,
  SlideBottom,
  TitleAndContent,
  InteractionInfo,
  HeartIcon,
  HeartFillIcon,
  Button
};
