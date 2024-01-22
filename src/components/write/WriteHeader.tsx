import styled from 'styled-components';
import theme from '../../styles/theme';
import SubmitButton, { CustomButton } from './SubmitButton';
import IsEditingButton from './editPost/EditUploadButton';

type Props = {
  isEditing: boolean;
};

function Header({ isEditing }: Props) {
  return (
    <WriteHeader>
      <ButtonContainer>
        <CustomButton $variant="save">임시 저장</CustomButton>
        {isEditing ? <IsEditingButton /> : <SubmitButton />}
      </ButtonContainer>
    </WriteHeader>
  );
}

export default Header;

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
