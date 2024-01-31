import styled from 'styled-components';
import theme from '../../../../styles/theme';

const CommentSubmitForm = styled.form`
  display: flex;
  position: relative;
  width: 100%;
  height: 140px;
  column-gap: 10px;
  border: 1px solid #888;
  border-radius: 10px;
  overflow: hidden;
  padding: 20px 0 20px 20px;

  & textarea {
    flex: 1;
    color: ${theme.color.gray};
    outline: none;
    border: none;
    background-color: #fff;
    font-size: 16px;
    padding: 0 100px 0 0;
    resize: none;
    background-color: transparent;
  }
  //모바일 세로
  @media screen and (max-width: 376px) {
    width: 350px;
    height: 140px;
    margin: auto;
    padding: 10px 0 10px 10px;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  color: #fff;
  border: 1px solid #888;
  border: none;
  border-radius: 10px;
  background-color: ${theme.color.mangoMain};
  font-size: 16px;
  display: flex;
  width: 80px;
  height: 40px;
  padding: 14px 21px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0.8px;
  right: 20px;
  bottom: 20px;
  &:hover {
    background-color: #df8d11;
    cursor: pointer;
  }

  //모바일 세로
  @media screen and (max-width: 376px) {
    height: 35px;
  }
`;
export default {
  CommentSubmitForm,
  SubmitButton
};
