// hooks/useDeleteTempSave.js
import { useSetRecoilState } from 'recoil';
import { modalState } from '../recoil/modals';
import { useModal } from './useModal';

export const useDeleteTempSave = () => {
  const modal = useModal();
  const setIsModalOpen = useSetRecoilState(modalState);

  const onDeleteTempSaveHandler = () => {
    sessionStorage.removeItem('savedData');
    const onClickDelete = () => {
      setIsModalOpen((prev) => ({ ...prev, isModalOpen07: false }));
      modal.close();
    };

    const openModalParams = {
      title: '삭제되었습니다.',
      message: '',
      leftButtonLabel: '',
      onClickLeftButton: undefined,
      rightButtonLabel: '확인',
      onClickRightButton: onClickDelete
    };

    modal.open(openModalParams);
    setIsModalOpen((prev) => ({ ...prev, isModalOpen07: true }));
  };

  return onDeleteTempSaveHandler;
};
