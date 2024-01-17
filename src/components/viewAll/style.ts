import styled from 'styled-components';
import theme from '../../styles/theme';

/*유저 등록 데이터 (친환경노하우~습관인증) */
const MainSubWrapper = styled.div`
  width: 100%;
  margin: auto;
  //margin-bottom: 58px;
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
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
`;

export const Contents = styled.ul`
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
  row-gap: 10px;
  position: relative;
  /* width: 235px; //345 > 235 변경 *아래Row width도 같이 변경필요 */
  height: 390px; //626 > 500 변경 > HMM 390 변경
  /* flex-shrink: 0; */
  border-radius: 10px; // HM
  border: 1px solid ${theme.color.lightgray};
  background: #fff;
  overflow: hidden; // HM

  /* li {
    list-style: none;
    width: 35%;
  } */

  /* p {
    margin-bottom: 10px;
  } */
`;

export const ContentImg = styled.img`
  object-fit: cover;
  width: 100%; //345 > 233 변경 > HM 100% 변경
  height: 230px; //420 > 280 변경 > HM 230px 변경
  /* flex-shrink: 0; */
  /* border-radius: 40px 40px 0px 0px; */
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3px;
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
    font-size: 10px;
    font-weight: 400;
  }
`;

export const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 10px;
  padding: 0 15px;

  font-size: 16px;
`;

export const CommentAndLikes = styled.div`
  // 이름 pascal case 변경
  display: flex;
  justify-content: start;
  column-gap: 10px;
  color: ${theme.color.lightgray};
  padding: 5px 0;
  font-size: 14px;
  position: absolute;
  bottom: 3%;
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
  justify-content: space-between;
  color: #222;
  font-size: 14px;
  /* width: 100%; */
  /* padding: 0 20px; */
  /* height: 80px; */
  /* flex-shrink: 0; */
  p {
    color: #222;
    font-weight: 400;
    /* margin-bottom: 10px; */
    //font-family: SB AggroOTF;
    /* font-size: 12px; */
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
  color: #000;
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
  border: 1px solid #747474;
  height: 1px;
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
  column-gap: 10px;
  /* justify-content: flex-start; */
  padding: 0 10px; // 위아래 여백 content의 row gap으로 대체
`;

const ProfileImg = styled.img`
  width: 35px; //HM 40 > 35 변경
  height: 35px; //HM 40 > 35 변경
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
  PostInfoContainer
};
