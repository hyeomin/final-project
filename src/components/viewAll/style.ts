import { GoHeart, GoHeartFill } from 'react-icons/go';
import styled from 'styled-components';
import theme from '../../styles/theme';
/*유저 등록 데이터 (친환경노하우~습관인증) */
const MainSubWrapper = styled.div`
  width: 100%;
  /* margin: auto; */
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
  //font-family: Apple SD Gothic Neo;
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
    //font-family: Apple SD Gothic Neo;
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
  /* margin: auto; */
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
  /* display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; */
  gap: 20px;
`;

const Content = styled.li`
  display: flex;
  flex-direction: column;
  /* position: relative; */
  /* width: 235px; //345 > 235 변경 *아래Row width도 같이 변경필요 */
  height: 390px; //626 > 500 변경 > HM 390 변경
  /* flex-shrink: 0; */
  border-radius: 10px; // HM
  border: 1px solid ${theme.color.lightgray};
  background: white; // white로 변경
  overflow: hidden; // HM

  /* li {
    list-style: none;
    width: 35%;
  } */

  /* p {
    margin-bottom: 10px;
  } */
`;

const HeartClickButton = styled.button<{ $isLiked: boolean }>`
  all: unset;
  color: ${({ $isLiked }) => ($isLiked ? 'red' : theme.color.lightgray)};
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const ContentImg = styled.img`
  object-fit: cover;
  width: 100%; //345 > 233 변경 > HM 100% 변경
  height: 210px; //420 > 280 변경 > HM 230px 변경
  /* flex-shrink: 0; */
  /* border-radius: 40px 40px 0px 0px; */
  &:hover {
    cursor: pointer;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 5px;
  /* align-items: start; */
  /* border-top: 1px solid #000000; */
  /* width: 200px; */

  /* position: absolute; */
  /* relative: St.Content */
  /* bottom: 3%;
  left: 5%; */

  /* padding-top: 8px; */

  & p {
    font-weight: bold;
    font-size: 14px; // HM 망고망 16px
  }

  span {
    /* margin-left: 15px; */
    color: #bbb; // #222222에서 변경
    //font-family: SB AggroOTF;
    font-size: 12px;
    font-weight: 400;
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
`;

const CommentAndLikes = styled.div`
  // 이름 pascal case 변경
  display: flex;
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
  //font-family: Apple SD Gothic Neo;
  font-size: 38px;
  font-weight: 700;
`;

const MangoSUbWord = styled.p`
  /* color: #000; */
  text-align: left;
  //font-family: Inter;
  font-size: 17px;
  font-weight: 500;
  margin-top: 10px;
  // margin-bottom: 10px;
`;

const AdminContents = styled.ul`
  //kim
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 40px;

  //sh
  gap: 20px;
`;

const AdminContent = styled.li`
  width: 490px;
  margin-bottom: 40px;
  li {
    list-style: none;
    width: 35%;
  }

  img {
    object-fit: cover;
    width: 490px; //710 -> 550 (전체사이즈 1200)
    height: 300px;
    flex-shrink: 0;
    border-radius: 40px;
    background: #d9d9d9;
    &:hover {
      cursor: pointer;
    }
  }
`;

const AdminPostTitle = styled.p`
  color: #000;
  //font-family: ${theme.font.pretendard};
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
  //font-family: ${theme.font.pretendard};
  font-size: 16px;
  font-weight: 400;
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
  HeartFillIcon
};
