import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { updateLikedUsers } from '../api/homeApi';
import { QUERY_KEYS } from './keys';
import { auth } from '../shared/firebase';

type MutationContext = {
  previousPosts: PostType[] | [];
};

const useLikeCountQuery = () => {
  const currentUserId = auth.currentUser?.uid;
  const queryClient = useQueryClient();
  const { mutate: likeCountMutate } = useMutation({
    // mutationKey: [QUERY_KEYS.POSTS],
    mutationFn: updateLikedUsers,
    onMutate: async (post) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.POSTS] });
      const previousPosts = queryClient.getQueryData<PostType[]>([QUERY_KEYS.POSTS]);

      if (currentUserId) {
        // 옵티미스틱 업데이트
        queryClient.setQueryData([QUERY_KEYS.POSTS], (old: PostType[] | []) => {
          // console.log('old', old);
          return old.map((p) => {
            if (p.id === post.id) {
              // 현재 사용자가 이미 '좋아요'를 눌렀는지 확인
              const isLiked = p.likedUsers!.includes(currentUserId);
              // console.log('isLiked', isLiked);
              return {
                ...p,
                likedUsers: isLiked
                  ? p.likedUsers!.filter((uid) => uid !== currentUserId)
                  : [...p.likedUsers!, currentUserId],
                likeCount: isLiked ? p.likeCount! - 1 : p.likeCount! + 1
              };
            }
            return p;
          });
        });
      }
      return { previousPosts: previousPosts ?? [] };
    },
    // error, variables, context
    onError: (error: Error, _: PostType, context: MutationContext | undefined): void => {
      if (context?.previousPosts) {
        queryClient.setQueryData([QUERY_KEYS.POSTS], context.previousPosts);
      }
      console.log('onError: ', error);
      console.log('context: ', context);
    },
    onSettled: () => {
      console.log('onSettled');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    }
  });
  return { likeCountMutate };
};

export default useLikeCountQuery;
