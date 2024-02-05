import styled from 'styled-components';
import theme from '../../../../../styles/theme';

const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 14px;
  margin-top: 20px;
`;

const SingleComment = styled.div`
  display: flex;
  column-gap: 20px;
  border-bottom: 1px solid ${theme.color.lightgray};
  padding: 40px 0;
  height: 139px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  @media screen and (max-width: 431px) {
    padding: 20px;
    img {
      width: 30px;
      height: 30px;
    }
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
  @media screen and (max-width: 431px) {
    row-gap: 15px;
  }
`;

const NameAndTime = styled.div`
  display: flex;
  column-gap: 20px;
  font-weight: bold;
  @media screen and (max-width: 431px) {
    flex-direction: column;
    gap: 5px;
    font-size: 13px;
  }
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
