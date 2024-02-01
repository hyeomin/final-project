import styled from 'styled-components';
import theme from '../../../../styles/theme';

const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 14px;
  //모바일 세로
  @media screen and (max-width: 431px) {
    padding: 0 20px;
  }
`;

const SingleComment = styled.div`
  display: flex;
  column-gap: 20px;
  border-bottom: 1px solid ${theme.color.lightgray};
  padding: 40px 0;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const CommentDetail = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  flex: 1;
  & textarea {
    resize: none;
    outline: none;
    height: 100px;
    border: 1px solid ${theme.color.lightgray};
    border-radius: 5px;
    padding: 10px;
  }
`;

const NameAndTime = styled.div`
  display: flex;
  column-gap: 20px;
  font-weight: bold;
`;

const Time = styled.span`
  color: ${theme.color.gray};
  font-weight: normal;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: baseline;

  & button {
    background-color: transparent;
    border-color: transparent;
    color: ${theme.color.gray};

    &:hover {
      text-decoration: underline;
      cursor: pointer;
      color: ${theme.color.mangoMain};
    }
  }
`;

const Content = styled.div`
  display: flex;
`;

const Mango = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: rotate(340deg);
`;

export default {
  CommentListContainer,
  SingleComment,
  CommentDetail,
  NameAndTime,
  Time,
  ButtonContainer,
  Content,
  Mango
};
