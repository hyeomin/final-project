import styled from 'styled-components';
import theme from 'types/styles/theme';

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 40px 0;
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
