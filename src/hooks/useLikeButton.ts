import { useNavigate } from 'react-router-dom';
import useLikeQuery from '../query/useLikeQuery';
import { auth } from '../shared/firebase';
import { useModal } from './useModal';

export const useLikeButton = () => {
  const modal = useModal();
  const currentUser = auth.currentUser?.uid;

  const navigate = useNavigate();
  const { likeCountMutate } = useLikeQuery();

  const onClickLikeButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string | undefined) => {
    e.preventDefault();
    e.stopPropagation();

    // if (!currentUser) {
    //   const confirmation = window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?');
    //   if (confirmation) navigate('/auth');
    // }

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
    if (id) likeCountMutate(id);
  };
  return onClickLikeButton;
};
