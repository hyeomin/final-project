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
  /* background-color: red; */

  & textarea {
    flex: 1;
    /* width: 95%; */
    color: ${theme.color.gray};
    outline: none;
    border: none;
    background-color: #fff;
    font-size: 16px;
    padding: 0 100px 0 0;
    resize: none;
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
`;
export default {
  CommentSubmitForm,
  SubmitButton
};
