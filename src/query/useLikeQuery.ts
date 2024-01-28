import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLikedUsers } from '../api/homeApi';
import { auth } from '../shared/firebase';
import { PostType } from '../types/PostType';
import { QUERY_KEYS } from './keys';

type MutationContext = {
  previousPosts: PostType[] | [];
};

const useLikeQuery = () => {
  const currentUserId = auth.currentUser?.uid;
  const queryClient = useQueryClient();
  const { mutate: likeCountMutate } = useMutation({
    mutationFn: updateLikedUsers,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['popularPosts'] });
      const previousPosts = queryClient.getQueryData<PostType[]>(['posts']);

      if (currentUserId) {
        // 옵티미스틱 업데이트
        queryClient.setQueryData(['popularPosts'], (old: PostType[] | []) => {
          return old.map((p) => {
            if (p.id === id) {
              // 현재 사용자가 이미 '좋아요'를 눌렀는지 확인
              const isLiked = p.likedUsers!.includes(currentUserId);
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
    onError: (error: Error, _: string, context: MutationContext | undefined): void => {
      if (context?.previousPosts) {
        queryClient.setQueryData([QUERY_KEYS.POSTS], context.previousPosts);
      }
      console.log('onError: ', error);
      //console.log('context: ', context);
    },
    onSettled: () => {
      //console.log('onSettled');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    }
  });
  return { likeCountMutate };
};

export default useLikeQuery;
