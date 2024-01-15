import styled from 'styled-components';
import theme from '../../styles/theme';
import style from '../auth/style';

/*유저 등록 데이터 (친환경노하우~습관인증) */
const MainSubWrapper = styled.div`
  width: 100%;
  margin: auto;
  margin-bottom: 150px;
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px;
`;

/*버튼*/
const ButtonWrapper = styled.div`
  //sh
  display: flex;
  height: 46px;
  align-items: flex-end;
  gap: 50px;

  //kim
  align-items: center;
`;

const Button = styled.button<{ selected: boolean }>`
  font-family: Apple SD Gothic Neo;
  font-size: 17px;
  font-style: normal;
  font-weight: ${({ selected }) => (selected ? 800 : 400)};
  color: ${({ selected }) => (selected ? '#222' : '#888')};
  border: none;
  border-bottom: ${({ selected }) => (selected ? '2px solid #ffa114' : 'none')};
  line-height: normal;
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
    font-family: Apple SD Gothic Neo;
    font-size: 17px;
    font-style: normal;
  }
  li a.selected {
    font-weight: 700;
    color: #222;
    line-height: normal;
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
  margin-bottom: 70px;
  display: flex;
  gap: 20px;
`;

const Contents = styled.ul`
  display: flex;

  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
`;

const Content = styled.li`
  position: relative;
  width: 235px; //345 > 235 변경 *아래Row width도 같이 변경필요
  height: 500px; //626 > 500 변경
  flex-shrink: 0;
  border-radius: 40px;
  border: 1px solid #000;
  background: #fff;

  li {
    list-style: none;
    width: 35%;
  }

  p {
    margin-bottom: 10px;
  }
`;

const ContentImg = styled.img`
  object-fit: cover;
  width: 233px; //345 > 233 변경
  height: 280px; //420 > 280 변경
  flex-shrink: 0;
  border-radius: 40px 40px 0px 0px;
`;

const Row = styled.div`
  border-top: 1px solid #000000;
  width: 200px;

  position: absolute; /* relative: St.Content */
  bottom: 3%;
  left: 5%;

  padding-top: 8px;
  //margin: 0;

  h3 {
    margin-left: 15px;
    color: #222222;
    font-family: SB AggroOTF;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const commentAndLikes = styled.div`
  padding: 0 20px;
  padding-top: 10px;
  display: flex;
  gap: 10px;
`;

const TitleAndContent = styled.div`
  padding: 0 20px;
  width: 100%;
  height: 80px;
  flex-shrink: 0;
  p {
    margin-bottom: 10px;
    color: #222;
    font-family: SB AggroOTF;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

/*더보기*/

const MoreContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;

  button {
    //sh
    width: 200px;
    height: 45px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #ffa114;
    border: none;

    color: #fff;
    text-align: center;
    font-family: Apple SD Gothic Neo;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
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
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const MangoOutWord = styled.p`
  color: #000;
  font-family: Apple SD Gothic Neo;
  font-size: 38px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const MangoSUbWord = styled.p`
  color: #000;
  text-align: left;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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
    height: 360px;
    flex-shrink: 0;
    border-radius: 40px;
    background: #d9d9d9;
  }
`;

const AdminPostTitle = styled.p`
  color: #000;
  //font-family: ${theme.font.pretendard};
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;
`;

const AdminPostSpace = styled.div`
  display: flex;
  height: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const AdminPostContent = styled.div`
  color: #000;
  //font-family: ${theme.font.pretendard};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 20px;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
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
  commentAndLikes,
  UserProfile,
  ProfileImg,
  NeedDelete
};
