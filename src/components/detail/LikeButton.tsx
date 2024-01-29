import { useMutation, useQueryClient } from '@tanstack/react-query';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import { useModal } from '../../hooks/useModal';
import { QUERY_KEYS } from '../../query/keys';
import { db } from '../../shared/firebase';
import { PostType } from '../../types/PostType';

type LikeButtonProps = {
  foundDetailPost: PostType;
  buttonSize: number;
  likeFalseColor: string;
  likeTrueColor: string;
};

function LikeButton({ foundDetailPost, buttonSize, likeFalseColor, likeTrueColor }: LikeButtonProps) {
  const modal = useModal();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const authCurrentUser = authContext?.currentUser;

  const queryClient = useQueryClient();

  const { mutateAsync: toggleLike } = useMutation({
    mutationFn: async (postId: string) => {
      const postRef = doc(db, QUERY_KEYS.POSTS, postId);
      if (authCurrentUser) {
        await updateDoc(postRef, {
          likedUsers: foundDetailPost.isLiked ? arrayRemove(authCurrentUser?.uid) : arrayUnion(authCurrentUser?.uid)
        });
      }

      const postSnap = await getDoc(postRef);

      if (postSnap && authCurrentUser) {
        const postData = postSnap.data();

        await updateDoc(postRef, {
          likeCount: postData?.likedUsers?.length
        });
      }
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.POSTS] });
      const prevPosts = queryClient.getQueryData([QUERY_KEYS.POSTS]);

      queryClient.setQueryData([QUERY_KEYS.POSTS], (old: PostType[]) => {
        return old.map((p) => {
          if (p.id === postId && authCurrentUser) {
            const isLiked = p.likedUsers.includes(authCurrentUser?.uid);
            return {
              ...p,
              likedUsers: isLiked
                ? p.likedUsers!.filter((uid) => uid !== authCurrentUser.uid)
                : [...p.likedUsers!, authCurrentUser.uid],
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
    if (!authCurrentUser) {
      const onClickCancel = () => {
        modal.close();
        return;
      };

      const onClickNavigate = () => {
        modal.close();
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
    }

    // 로그인 한 유저는 좋아요 실행
    await toggleLike(foundDetailPost.id);
  };

  // 좋아요 여부 확인
  const isPostLiked =
    authCurrentUser?.uid &&
    Array.isArray(foundDetailPost.likedUsers) &&
    foundDetailPost.likedUsers.includes(authCurrentUser?.uid);

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
