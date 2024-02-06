import { GoHeart, GoHeartFill } from 'react-icons/go';
import styled from 'styled-components';
import theme from 'styles/theme';

const ViewAllContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  min-height: 1544px;

  //모바일 세로
  @media screen and (max-width: 431px) {
    width: 100%;
    background-color: purple;
  }
`;

/*유저 등록 데이터 (친환경노하우~습관인증) */
const MainSubWrapper = styled.div`
  width: 100%;
  margin-bottom: 150px;

  @media screen and (max-width: 431px) {
    margin: auto;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px 30px;

  @media screen and (max-width: 431px) {
    flex-direction: column;
    margin: auto;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 50px;
  align-items: center;
  @media screen and (max-width: 431px) {
    justify-content: space-between;
    gap: 0;
  }
`;

const Button = styled.button<{ selected: boolean }>`
  font-size: 17px;
  font-weight: ${({ selected }) => (selected ? 800 : 400)};
  color: ${({ selected }) => (selected ? '#222' : '#888')};
  border: none;
  border-bottom: ${({ selected }) => (selected ? '2px solid #ffa114' : 'none')};
  outline: none;
  cursor: pointer;
  background-color: transparent;

  @media screen and (max-width: 431px) {
    font-size: 14px;
  }
`;

const SortWrapper = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;

  li a {
    text-decoration: none;

    color: #888;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
  }
  li a.selected {
    font-weight: 700;
    color: #222;
  }

  @media screen and (max-width: 431px) {
    width: 100%;
    gap: 20;
    background-color: lightblue;

    li a {
      font-size: 13px;
    }
  }
`;

/*게시물*/
const ContentsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 60px;
  gap: 20px;
  justify-content: center;
`;

const Contents = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 431px) {
    grid-template-columns: 50% 50%;
    gap: 0px;
  }
`;

const Content = styled.li`
  display: flex;
  flex-direction: column;
  height: 390px;
  border-radius: 10px;
  border: 1px solid ${theme.color.lightgray};
  background: white;
  overflow: hidden;

  @media screen and (max-width: 431px) {
    height: 250px;
    margin: 5px;
  }
`;

const HeartClickButton = styled.button<{ $isLiked: boolean }>`
  all: unset;
  color: ${({ $isLiked }) => ($isLiked ? '#FF0000' : theme.color.lightgray)};
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const ContentImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 53%;

  &:hover {
    cursor: pointer;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 5px;

  & p {
    font-weight: bold;
    font-size: 14px;
  }

  span {
    color: #bbb;
    font-size: 12px;
    font-weight: 400;
  }

  @media screen and (max-width: 431px) {
    & p {
      font-size: 12px;
    }

    span {
      font-size: 10px;
    }
  }
`;

export const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  row-gap: 15px;
  padding: 15px;
  font-size: 16px;

  @media screen and (max-width: 431px) {
    padding: 10px;
    row-gap: 5px;
    font-size: 14px;
  }
`;

const CommentAndLikes = styled.div`
  display: flex;
  justify-content: start;
  column-gap: 10px;
  color: ${theme.color.lightgray};
  font-size: 14px;
  & span {
    display: flex;
    column-gap: 3px;
  }
`;

export const TitleAndContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 1;
  row-gap: 15px;
  padding: 5px;

  p {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: bold;
  }

  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: normal;
    font-size: 14px;
    line-height: normal;
    color: ${theme.color.gray};
  }
`;

const MoreContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 40px;

  button {
    width: 170px;
    height: 35px;
    flex-shrink: 0;
    border-radius: 10px;
    background-color: ${theme.color.mangoMain};
    border: none;

    color: #fff;
    text-align: center;
    font-size: 16px;
    font-weight: 400;

    &:hover {
      background: #df8d11;
      cursor: pointer;
    }
  }
`;

const MangoDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
`;

const MangoWord = styled.p`
  color: ${theme.color.mangoMain};
  font-family: ${theme.font.mango};
  font-size: 38px;
  font-weight: 400;
`;

const MangoOutWord = styled.p`
  font-size: 38px;
  font-weight: 700;
`;

const MangoSUbWord = styled.p`
  text-align: left;
  font-size: 17px;
  font-weight: 500;
  margin-top: 10px;
`;

const AdminContents = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 40px;
  gap: 20px;
  margin-bottom: 20px;

  & span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: normal;
    color: ${theme.color.gray};
    line-height: normal;
  }

  @media screen and (max-width: 431px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const AdminContent = styled.li`
  display: grid;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    flex-shrink: 0;
    border-radius: 20px;
    &:hover {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 431px) {
    width: 100%;
    img {
      object-fit: cover;
      width: 100%;
      border-radius: 20px;
      &:hover {
        cursor: pointer;
      }
      max-height: 263px;
    }
  }
`;

const AdminPostTitle = styled.p`
  font-size: 22px;
  font-weight: 700;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 10px;
  line-height: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: calc(2 * 1em);
`;

const AdminPostSpace = styled.div`
  border-bottom: 0.25px solid ${theme.color.gray};
  height: 10px;
`;

const AdminPostContent = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  @media screen and (max-width: 431px) {
    font-size: 10px;
    font-weight: 400;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & div {
    display: flex;
    column-gap: 15px;
    justify-content: center;
  }
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
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

export default {
  Button,
  ButtonWrapper,
  SortWrapper,
  ContentsWrapper,
  Contents,
  Content,
  ContentImg,
  MainSubWrapper,
  MoreContentWrapper,
  MangoDiv,
  MangoWord,
  MangoOutWord,
  MangoSUbWord,
  AdminContents,
  AdminContent,
  AdminPostTitle,
  AdminPostSpace,
  AdminPostContent,
  CategoryWrapper,
  Row,
  TitleAndContent,
  CommentAndLikes,
  UserProfile,
  ProfileImg,
  NeedDelete,
  PostInfoContainer,
  HeartClickButton,
  LikeButton,
  HeartIcon,
  HeartFillIcon,
  ViewAllContainer
};
