import { useRecoilValue } from 'recoil';
import { useModal } from '../../../hooks/useModal';
import { postInputState } from '../../../recoil/posts';
import { FoundDetailPostProps } from '../../../types/PostType';
import IsEditingButton from './EditUploadButton';
import SubmitButton from './SubmitButton';
import St, { CustomButton } from './styles';

// type Props = {
//   isEditing: boolean;
// };

function Header({ foundDetailPost }: FoundDetailPostProps) {
  const modal = useModal();
  const postInput = useRecoilValue(postInputState);

  const onTempSaveHandler = () => {
    // sessionStorage에 데이터 저장
    sessionStorage.setItem('savedData', JSON.stringify(postInput));
    console.log('저장된 post', postInput);

    //모달
    const onClickSave = () => {
      modal.close();
    };

    const openModalParams: Parameters<typeof modal.open>[0] = {
      title: '임시 저장되었습니다.',
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
        <CustomButton $variant="save" onClick={onTempSaveHandler}>
          임시 저장
        </CustomButton>
        {foundDetailPost ? <IsEditingButton postId={foundDetailPost.id} /> : <SubmitButton />}
      </St.ButtonContainer>
    </St.WriteHeader>
  );
}

export default Header;
