import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateLikedUsersType, updateLikedUsers } from 'api/homeApi';
import { QUERY_KEYS } from 'query/keys';
import { PostType } from 'types/PostType';

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
        queryClient.setQueryData(['posts', 'popular'], (old: PostType[] | []) => {
          return old.map((p) => {
            if (p.id === id) {
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

    onError: (error: Error, _: UpdateLikedUsersType, context: MutationContext | undefined): void => {
      if (context?.previousPosts) {
        queryClient.setQueryData([QUERY_KEYS.POSTS], context.previousPosts);
      }
      console.log('좋아요 업데이트 실패!: ', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    }
  });
  return { likeCountMutate };
};

export default useLikeQuery;
