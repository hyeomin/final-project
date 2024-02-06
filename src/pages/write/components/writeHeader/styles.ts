import styled from 'styled-components';
import theme from 'styles/theme';

// WriteHeader.tsx
const WriteHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${theme.color.lightgray};
`;

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 10px;
  font-weight: bold;
`;

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: 'save' | 'done';
}

export const CustomButton = styled.button<CustomButtonProps>`
  color: white;
  background-color: ${theme.color.mangoMain};
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;

  ${({ $variant }) =>
    $variant === 'save' &&
    `
    color: black;
    background-color: white;
    border:  1px solid lightgray;

  `}
`;

export default { WriteHeader, ButtonContainer };
