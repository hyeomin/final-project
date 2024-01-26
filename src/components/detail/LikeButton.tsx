import { useMutation, useQueryClient } from '@tanstack/react-query';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { produce } from 'immer';
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
      const postRef = doc(db, `${QUERY_KEYS.POSTS}`, postId);

      if (!!foundDetailPost.isLiked) {
        let newLikeCount;
        if (foundDetailPost.isLiked) {
          //이미 좋아요한 경우
          newLikeCount = foundDetailPost.likeCount ? foundDetailPost.likeCount - 1 : 0;
        } else {
          //좋아요 안 한 경우
          newLikeCount = foundDetailPost.likeCount !== undefined ? foundDetailPost.likeCount + 1 : 1;
        }

        await updateDoc(postRef, {
          likedUsers: foundDetailPost.isLiked ? arrayRemove(authCurrentUser?.uid) : arrayUnion(authCurrentUser?.uid),
          likeCount: newLikeCount
        });
      }
    },
    onMutate: async (postId) => {
      queryClient.setQueriesData<PostType[]>({ queryKey: [`${QUERY_KEYS.POSTS}`] }, (prevPosts) => {
        if (!prevPosts) return [];
        const nextPosts = produce(prevPosts, (draftPosts) => {
          console.log('draftPosts', draftPosts);
          const post = draftPosts.find((post) => post.id === postId);
          if (!post) return draftPosts;

          post.isLiked = !post.isLiked;

          return draftPosts;
        });

        return nextPosts;
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`${QUERY_KEYS.POSTS}`] });
    }
  });

  const handleClickLikeButton = async (event: React.MouseEvent<Element>) => {
    event.stopPropagation();

    if (!authCurrentUser) {
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

    await toggleLike(foundDetailPost.id);
  };

  const isPostLiked = authCurrentUser?.uid && foundDetailPost.likedUsers?.includes(authCurrentUser?.uid);

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
`;
