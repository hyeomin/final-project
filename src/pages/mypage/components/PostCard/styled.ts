import styled from 'styled-components';
import theme from '../../../../styles/theme';

const Content = styled.li`
  display: flex;
  flex-direction: column;
  height: 390px; //626 > 500 변경 > HM 390 변경
  border-radius: 10px; // HM
  border: 1px solid ${theme.color.lightgray};
  background: white; // white로 변경
  overflow: hidden; // HM
`;

const HeartClickButton = styled.button<{ $isLiked: boolean }>`
  all: unset;
  color: ${({ $isLiked }) => ($isLiked ? 'red' : theme.color.lightgray)};
  font-size: 20px;
`;

const ContentImg = styled.img`
  object-fit: cover;
  width: 100%; //345 > 233 변경 > HM 100% 변경
  height: 210px; //420 > 280 변경 > HM 230px 변경

  //희원 수정
  /* @media screen and (max-width: 768px) {
    width: 100%;
    height: 180px;
  } */
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 5px;

  & p {
    font-weight: bold;
    font-size: 14px; // HM 망고망 16px
    //희원 수정
    /* @media screen and (max-width: 768px) {
      font-size: 12px;
    } */
  }

  span {
    /* margin-left: 15px; */
    color: #bbb; // #222222에서 변경
    //font-family: SB AggroOTF;
    font-size: 12px;
    font-weight: 400;
    //희원 수정
    /* @media screen and (max-width: 768px) {
      font-size: 10px;
      margin: 0;
    } */
  }
`;

export const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  /* justify-content: space-between; */
  row-gap: 15px;
  padding: 15px;
  font-size: 16px;

  //희원 수정
  /* @media screen and (max-width: 768px) {
    padding: 10px;
    row-gap: 20px;
  } */
`;

const CommentAndLikes = styled.div`
  display: flex;
  // 이름 pascal case 변경
  justify-content: start;
  column-gap: 10px;
  color: ${theme.color.lightgray};
  font-size: 14px;
  // position: absolute;
  //bottom: 3%;
  & span {
    display: flex;
    column-gap: 3px;
  }

  /* padding: 0 20px;
  padding-top: 10px;
  display: flex;
  gap: 10px; */
`;

export const TitleAndContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 1;
  row-gap: 15px;
  /* color: #222; */

  padding: 5px;
  /* width: 100%; */
  /* padding: 0 20px; */
  /* height: 80px; */
  /* flex-shrink: 0; */

  p {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: bold;
  }

  /* 아래 p에서 span으로 변경 */
  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    /* color: #222; */
    font-weight: normal;
    /* margin-bottom: 10px; */
    //font-family: SB AggroOTF;
    font-size: 14px;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* position: relative; */
  /* justify-content: flex-start; */
  /* padding: 0 15px; */

  & div {
    display: flex;
    column-gap: 15px;
    justify-content: center;
    //희원 수정
    /* @media screen and (max-width: 768px) {
      column-gap: 10px;
    } */
  }
`;

const ProfileImg = styled.img`
  width: 30px; //HM 40 > 35 변경
  height: 30px; //HM 40 > 35 변경
  border-radius: 50%;
  /* margin-right: 10px; */ // UserProfile column gap으로 대체
  /* img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  } */
  //희원 수정
  /* @media screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
  } */
`;

const NeedDelete = styled.div`
  p {
    color: ${theme.color.mangoMain};
  }
`;
const LikeButton = styled.button`
  background-color: transparent;
  border: none;
  width: 25px;
  height: 25px;
`;

export default {
  Content,
  ContentImg,
  Row,
  TitleAndContent,
  CommentAndLikes,
  UserProfile,
  ProfileImg,
  NeedDelete,
  PostInfoContainer,
  HeartClickButton,
  LikeButton
};
