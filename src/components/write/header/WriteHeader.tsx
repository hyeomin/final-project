import IsEditingButton from './EditUploadButton';
import SubmitButton from './SubmitButton';
import St, { CustomButton } from './styles';

type Props = {
  isEditing: boolean;
};

function Header({ isEditing }: Props) {
  return (
    <St.WriteHeader>
      <St.ButtonContainer>
        <CustomButton $variant="save">임시 저장</CustomButton>
        {isEditing ? <IsEditingButton /> : <SubmitButton />}
      </St.ButtonContainer>
    </St.WriteHeader>
  );
}

export default Header;
