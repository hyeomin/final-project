import { useNavigate } from 'react-router-dom';
import useLikeQuery from '../query/useLikeQuery';
import { auth } from '../shared/firebase';
import { useModal } from './useModal';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
export const useLikeButton = () => {
  const modal = useModal();
  const authContext = useContext(AuthContext);
  const currentUserId = authContext?.currentUser?.uid;
  const navigate = useNavigate();
  const { likeCountMutate } = useLikeQuery();
  const onClickLikeButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string | undefined) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUserId) {
      const onClickCancel = () => {
        modal.close();
        return;
      };

      const onClickSave = () => {
        modal.close();
        navigate('/auth');
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '로그인이 필요합니다.',
        message: '로그인 창으로 이동하시겠습니까?',
        leftButtonLabel: '취소',
        onClickLeftButton: onClickCancel,
        rightButtonLabel: '로그인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
    }
    if (id && currentUserId) likeCountMutate({ id, currentUserId });
  };
  return onClickLikeButton;
};
