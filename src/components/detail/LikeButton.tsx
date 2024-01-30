import { useMutation, useQueryClient } from '@tanstack/react-query';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { QUERY_KEYS } from '../../query/keys';
import { auth, db } from '../../shared/firebase';
import { PostType } from '../../types/PostType';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/modals';

type LikeButtonProps = {
  foundDetailPost: PostType;
  buttonSize: number;
  likeFalseColor: string;
  likeTrueColor: string;
};

function LikeButton({ foundDetailPost, buttonSize, likeFalseColor, likeTrueColor }: LikeButtonProps) {
  const modal = useModal();
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const navigate = useNavigate();
  const uid = auth.currentUser?.uid;

  const queryClient = useQueryClient();

  const { mutateAsync: toggleLike } = useMutation({
    mutationFn: async (postId: string) => {
      const postRef = doc(db, 'posts', postId);

      if (uid) {
        const isLiked = foundDetailPost.likedUsers?.includes(uid);
        let newLikeCount = isLiked ? foundDetailPost.likeCount - 1 : foundDetailPost.likeCount + 1;
        // Firebase 업데이트
        await updateDoc(postRef, {
          likedUsers: foundDetailPost.likedUsers?.includes(uid) ? arrayRemove(uid) : arrayUnion(uid),
          likeCount: newLikeCount
        });
      }
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.POSTS] });
      const prevPosts = queryClient.getQueryData([QUERY_KEYS.POSTS]);

      queryClient.setQueryData([QUERY_KEYS.POSTS], (old: PostType[]) => {
        return old.map((p) => {
          if (p.id === postId && uid) {
            const isLiked = p.likedUsers.includes(uid);
            return {
              ...p,
              likedUsers: isLiked ? p.likedUsers!.filter((users) => users !== uid) : [...p.likedUsers!, uid],
              likeCount: isLiked ? p.likeCount! - 1 : p.likeCount! + 1
            };
          }
          return p;
        });
      });
      return { prevPosts };
    },
    onError: (error, postId, context) => {
      queryClient.setQueryData([QUERY_KEYS.POSTS], context?.prevPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`${QUERY_KEYS.POSTS}`] });
    }
  });

  const handleClickLikeButton = async (event: React.MouseEvent<Element>) => {
    event.stopPropagation();
    // 로그인 여부 확인
    if (!uid) {
      const onClickCancel = () => {
        modal.close();
        setIsModalOpen((prev) => ({ ...prev, isModalOpen01: false }));
        return;
      };

      const onClickNavigate = () => {
        modal.close();
        setIsModalOpen((prev) => ({ ...prev, isModalOpen01: false }));
        navigate('/auth');
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '로그인이 필요합니다.',
        message: '로그인 창으로 이동하시겠습니까?',
        leftButtonLabel: '취소',
        onClickLeftButton: onClickCancel,
        rightButtonLabel: '로그인',
        onClickRightButton: onClickNavigate
      };
      modal.open(openModalParams);
      setIsModalOpen((prev) => ({ ...prev, isModalOpen01: true }));
    }

    // 로그인 한 유저는 좋아요 실행
    await toggleLike(foundDetailPost.id);
  };

  // 좋아요 여부 확인
  const isPostLiked = uid && foundDetailPost.likedUsers.includes(uid);

  return (
    <LikeButtonIcon
      style={{ fontSize: `${buttonSize}px` }}
      onClick={handleClickLikeButton}
      $isPostLiked={isPostLiked || false}
      $likeFalseColor={likeFalseColor}
      $likeTrueColor={likeTrueColor}
    >
      {isPostLiked ? <GoHeartFill /> : <GoHeart />}
    </LikeButtonIcon>
  );
}

export default LikeButton;

type LikeButtonIconProps = {
  $isPostLiked: boolean;
  $likeFalseColor: string;
  $likeTrueColor: string;
};

const LikeButtonIcon = styled.span<LikeButtonIconProps>`
  color: ${(props) => (props.$isPostLiked ? `${props.$likeTrueColor}` : `${props.$likeFalseColor}`)};
  cursor: pointer;
`;
