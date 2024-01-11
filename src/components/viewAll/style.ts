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

const Button = styled.button`
  //sh
  color: #888;
  font-family: Apple SD Gothic Neo;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  //kim
  cursor: pointer;
  border: none;
  background-color: transparent;

  &:active,
  &:focus {
    color: #222;
    text-align: center;
    font-family: Apple SD Gothic Neo;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border-bottom: 2px solid #ffa114;
  }
`;

/*정렬*/
const SortWrapper = styled.ul`
  display: flex;
  justify-content: flex-end;
  gap: 20px;

  li a {
    text-decoration: none;

    color: #888;
    text-align: center;
    font-family: Apple SD Gothic Neo;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &:active,
    &:focus {
      color: #222;
      text-align: center;
      font-family: Apple SD Gothic Neo;
      font-size: 17px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
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
  margin: 30px;
  display: flex;

  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
`;

const Content = styled.li`
  position: relative;
  width: 270px; //345 > 270 변경
  height: 500px; //626 > 500 변경
  flex-shrink: 0;
  border-radius: 40px;
  border: 1px solid #000;
  background: #fff;

  li {
    list-style: none;
    width: 35%;
  }

  img {
    object-fit: cover;
    width: 268px; //345 > 268 변경
    height: 320px; //420 > 320 변경
    flex-shrink: 0;
    border-radius: 40px 40px 0px 0px;
  }

  p {
    margin-bottom: 10px;
  }
`;

const commentAndLikes = styled.div`
  padding: 0 40px;
  display: flex;
  gap: 10px;
`;

const TitleAndContent = styled.div`
  padding: 0 40px;
  width: 265px;
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
`;

const MangoWord = styled.p`
  color: ${theme.color.mangoMain};
  //font-family: Milk Mango;
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
  width: 590px;
  margin-bottom: 40px;
  li {
    list-style: none;
    width: 35%;
  }

  img {
    object-fit: cover;
    width: 590px; //710 -> 550 (전체사이즈 1200)
    height: 360px;
    flex-shrink: 0;
    border-radius: 40px;
    background: #d9d9d9;
  }
`;

const AdminPostTitle = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;
`;

const AdminPostContent = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Row = styled.div`
  border-top: 1px solid #000000;
  width: 240px;

  position: absolute; /* relative: St.Content */
  bottom: 3%;
  left: 5%;

  padding-top: 8px;
  margin: 0;

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
  MainSubWrapper,
  MoreContentWrapper,
  MangoDiv,
  MangoWord,
  MangoOutWord,
  MangoSUbWord,
  AdminContents,
  AdminContent,
  AdminPostTitle,
  AdminPostContent,
  CategoryWrapper,
  Row,
  TitleAndContent,
  commentAndLikes,
  NeedDelete
};
