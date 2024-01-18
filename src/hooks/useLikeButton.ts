import { useQueryClient } from '@tanstack/react-query';
import { auth } from '../shared/firebase';
import { useNavigate } from 'react-router-dom';
import useLikeCountQuery from '../query/useLikeCountQuery';
import { QUERY_KEYS } from '../query/keys';

export const useLikeButton = () => {
  const currentUser = auth.currentUser?.uid;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { likeCountMutate } = useLikeCountQuery();

  const onClickLikeButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string | undefined) => {
    e.preventDefault();
    e.stopPropagation();
    // 로그인이 안되어있을 경우
    if (!currentUser) {
      const confirmation = window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?');
      if (confirmation) navigate('/auth');
    }
    // 포스트 아이디가 매개변수로 전달된 경우
    if (id) {
      const postToUpdate: PostType = { id };
      likeCountMutate(postToUpdate);
    }
  };

  return onClickLikeButton;
};
