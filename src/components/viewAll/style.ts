import { GoHeart, GoHeartFill } from 'react-icons/go';
import styled from 'styled-components';
import theme from '../../styles/theme';

const ViewAllContainer = styled.div`
  width: 1000px;
  min-height: 1544px;
`;

/*유저 등록 데이터 (친환경노하우~습관인증) */
const MainSubWrapper = styled.div`
  width: 100%;
  min-height: 485px;
  margin-bottom: 150px; //58에서 변경
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px;
`;

/*버튼*/
const ButtonWrapper = styled.div`
  display: flex;
  height: 46px;
  align-items: flex-end;
  gap: 50px;

  align-items: center;
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
`;

/*정렬*/
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

  li:not(:last-child):after {
    content: '|';
    margin-left: 10px;
    color: #999;
  }
`;

/*게시물*/
const ContentsWrapper = styled.div`
  width: 100%;
  margin-bottom: 60px;
  display: flex;
  gap: 20px;
`;

const Contents = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

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
  color: ${({ $isLiked }) => ($isLiked ? '#FF0000' : theme.color.lightgray)};
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const ContentImg = styled.img`
  object-fit: cover;
  width: 100%; //345 > 233 변경 > HM 100% 변경
  height: 210px; //420 > 280 변경 > HM 230px 변경

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
    font-size: 14px; // HM 망고망 16px
  }

  span {
    color: #bbb; // #222222에서 변경
    font-size: 12px;
    font-weight: 400;
  }
`;

export const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  row-gap: 15px;
  padding: 15px;
  font-size: 16px;
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

  /* 아래 p에서 span으로 변경 */
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

/*더보기*/

const MoreContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 40px;

  button {
    //sh
    width: 170px;
    height: 35px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #ffa114;
    border: none;

    color: #fff;
    text-align: center;
    //font-family: Apple SD Gothic Neo;
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
  color: #000;
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
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 40px;
  gap: 20px;

  // ashley 추가 01.24
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
`;

const AdminContent = styled.li`
  width: 490px;

  img {
    object-fit: cover;
    width: 490px; //710 -> 550 (전체사이즈 1200)
    height: 300px;
    flex-shrink: 0;
    border-radius: 40px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const AdminPostTitle = styled.p`
  color: #000;
  font-size: 22px;
  font-weight: 700;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const AdminPostSpace = styled.div`
  border-bottom: 0.25px solid ${theme.color.gray};
  height: 10px;
`;

const AdminPostContent = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 400;
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
  width: 30px; //HM 40 > 35 변경
  height: 30px; //HM 40 > 35 변경!
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
