import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateLikedUsersType, updateLikedUsers } from '../api/homeApi';
import { PostType } from '../types/PostType';
import { QUERY_KEYS } from './keys';

type MutationContext = {
  previousPosts: PostType[] | [];
};

const useLikeQuery = () => {
  const queryClient = useQueryClient();
  const { mutate: likeCountMutate } = useMutation({
    mutationFn: updateLikedUsers,

    onMutate: async ({ id, currentUserId }) => {
      await queryClient.cancelQueries({ queryKey: ['posts', 'popular'] });
      const previousPosts = queryClient.getQueryData<PostType[]>(['posts', 'popular']);

      if (currentUserId) {
        // 옵티미스틱 업데이트
        queryClient.setQueryData(['posts', 'popular'], (old: PostType[] | []) => {
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
    onError: (error: Error, _: UpdateLikedUsersType, context: MutationContext | undefined): void => {
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
