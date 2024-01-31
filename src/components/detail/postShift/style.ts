import styled from 'styled-components';
import theme from '../../../styles/theme';

const ButtonContainer = styled.div`
  display: flex;
  /* justify-content: space-between; */
  width: 100%;
  padding: 40px 0;
  //모바일 세로
  @media screen and (max-width: 376px) {
    /* padding-right: 20px;
    padding-left: 20px; */
    padding: 25px 0px 25px 10px;
  }
`;

interface ShiftButtonProps {
  $side: string;
}

const ShiftButton = styled.button<ShiftButtonProps>`
  display: flex;
  flex: 1;
  justify-content: ${(props) => (props.$side === 'left' ? 'start' : 'flex-end')};
  column-gap: 5px;
  color: '#222';
  border: none;
  /* background-color: ${theme.color.mangoLight}; */
  background-color: transparent;
  font-size: 16px;

  & span {
    color: ${theme.color.gray};

    &:hover {
      color: black;
    }
  }

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: default;
    color: transparent;
  }
`;

export default { ButtonContainer, ShiftButton };
