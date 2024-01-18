import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isEditingState } from '../../recoil/posts';
import theme from '../../styles/theme';
import SubmitButton, { CustomButton } from './SubmitButton';
import IsEditingButton from './editPost/EditUploadButton';

function Header() {
  const [isEditing, setIsEditing] = useRecoilState(isEditingState);

  console.log('헤더 isEditing', isEditing);

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
  padding: 20px 0;
  border-bottom: 1px solid ${theme.color.lightgray};
  /* height: 50px; */
`;

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 10px;
  font-weight: bold;
  /* padding: 20px 0; */
`;
