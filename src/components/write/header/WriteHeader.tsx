import { useRecoilValue } from 'recoil';
import { postInputState } from '../../../recoil/posts';
import IsEditingButton from './EditUploadButton';
import SubmitButton from './SubmitButton';
import St, { CustomButton } from './styles';

type Props = {
  isEditing: boolean;
};

function Header({ isEditing }: Props) {
  const postInput = useRecoilValue(postInputState);

  const onTempSaveHandler = () => {
    // sessionStorage에 데이터 저장
    sessionStorage.setItem('savedData', JSON.stringify(postInput));
    alert('저장되었습니다.');
  };

  // 임시저장된 데이터 삭제할 수 있게
  const onDeleteTempSaveHandler = () => {
    sessionStorage.removeItem('savedData');
    alert('삭제되었습니다.');
  };

  return (
    <St.WriteHeader>
      <St.ButtonContainer>
        <button onClick={onDeleteTempSaveHandler}>임시저장 삭제</button>
        <CustomButton $variant="save" onClick={onTempSaveHandler}>
          임시 저장
        </CustomButton>
        {isEditing ? <IsEditingButton /> : <SubmitButton />}
      </St.ButtonContainer>
    </St.WriteHeader>
  );
}

export default Header;
