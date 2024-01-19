import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useLikeQuery from '../query/useLikeQuery';
import { auth } from '../shared/firebase';
import { PostType } from '../types/PostType';

export const useLikeButton = () => {
  const currentUser = auth.currentUser?.uid;
  const navigate = useNavigate();
  const { likeCountMutate } = useLikeQuery();

  const onClickLikeButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string | undefined) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      const confirmation = window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?');
      if (confirmation) navigate('/auth');
    }

    if (id) likeCountMutate(id);
  };
  return onClickLikeButton;
};
