import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isEditingState } from '../../recoil/posts';
import SubmitButton, { CustomButton } from './SubmitButton';
import IsEditingButton from './editPost/EditUploadButton';

function Header() {
  const [isEditing, setIsEditing] = useRecoilState(isEditingState);

  return (
    <WriteHeader>
      <ButtonContainer>
        <CustomButton variant="save">임시 저장</CustomButton>
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
  border-bottom: 1px solid black;
  height: 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 10px;
`;
