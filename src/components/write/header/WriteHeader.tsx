import { useRecoilValue } from 'recoil';
import { useModal } from '../../../hooks/useModal';
import { postInputState } from '../../../recoil/posts';
import IsEditingButton from './EditUploadButton';
import SubmitButton from './SubmitButton';
import St, { CustomButton } from './styles';

type Props = {
  isEditing: boolean;
};

function Header({ isEditing }: Props) {
  const modal = useModal();
  const postInput = useRecoilValue(postInputState);

  const onTempSaveHandler = () => {
    // sessionStorage에 데이터 저장
    sessionStorage.setItem('savedData', JSON.stringify(postInput));

    const onClickSave = () => {
      modal.close();
    };

    const openModalParams: Parameters<typeof modal.open>[0] = {
      title: '저장되었습니다.',
      message: '',
      leftButtonLabel: '',
      onClickLeftButton: undefined,
      rightButtonLabel: '확인',
      onClickRightButton: onClickSave
    };
    modal.open(openModalParams);
  };

  return (
    <St.WriteHeader>
      <St.ButtonContainer>
        {/* <button onClick={onDeleteTempSaveHandler}>임시저장 삭제</button> */}
        <CustomButton $variant="save" onClick={onTempSaveHandler}>
          임시 저장
        </CustomButton>
        {isEditing ? <IsEditingButton /> : <SubmitButton />}
      </St.ButtonContainer>
    </St.WriteHeader>
  );
}

export default Header;
