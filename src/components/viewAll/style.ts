import styled from 'styled-components';

/*유저 등록 데이터 (친환경노하우~습관인증) */
const MainSubWrapper = styled.div`
  width: 1440px;
  margin: auto;
  margin-bottom: 150px;
`;

/*버튼*/
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 100px;
  margin: 30px;
`;

const Button = styled.button`
  width: 130px;
  height: 30px;
  cursor: pointer;
`;

/*정렬*/
const SortWrapper = styled.ul`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-right: 160px;
  //width: 900px;

  li a {
    text-decoration: none;
    color: #333;
  }

  li:not(:last-child):after {
    content: '|';
    margin-left: 10px;
    color: #999;
  }
`;

/*게시물*/
const ContentsWrapper = styled.div`
  width: 1200px;
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
  gap: 80px;
`;

const Content = styled.li`
  width: 220px;
  height: 300px;
  li {
    list-style: none;
    width: 35%;
  }

  img {
    object-fit: cover;
    width: 230px;
    height: 280px;
    border: 1px solid #333;
  }

  p {
    text-align: center;
  }
`;

/*더보기*/

const MoreContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;

  button {
    width: 150px;
    height: 50px;
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
  MoreContentWrapper
};
