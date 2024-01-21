import styled from 'styled-components';
import theme from '../../../styles/theme';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 40px 0;

  & button {
    padding: 15px 30px;
    border-radius: 10px;
    border: none;
    /* border: 1px solid ${theme.color.mangoYellow}; */
    background-color: ${theme.color.mangoLight};
    font-size: 14px;

    &:hover {
      background-color: ${theme.color.mangoYellow};
      cursor: pointer;
    }

    &:disabled {
      cursor: default;
      &:hover {
        background-color: ${theme.color.mangoLight};
      }
    }
  }
`;

export default { ButtonContainer };
