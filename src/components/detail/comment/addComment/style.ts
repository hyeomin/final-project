import theme from '../../../../styles/theme';
import styled from 'styled-components';

const CommentSubmitForm = styled.form`
  display: flex;
  width: 100%;
  height: 60px;
  column-gap: 10px;
  & input {
    flex: 1;
    color: ${theme.color.gray};
    border: 1px solid #888;
    border-radius: 10px;
    background-color: #f6f6f6;
    font-size: 16px;
    padding: 0 20px;
  }
`;

const SubmitButton = styled.button`
  color: white;
  border: 1px solid #888;
  border: none;
  border-radius: 10px;
  background-color: ${theme.color.mangoMain};
  font-size: 16px;
  font-weight: bold;
  width: 100px;
  &:hover {
    background-color: #df8d11;
  }
`;
export default {
  CommentSubmitForm,
  SubmitButton
};
