import { useMutation } from '@tanstack/react-query';
import { updateLikedUsers } from '../api/homeApi';
import { QUERY_KEYS } from './keys';

function usePostsQuery() {
  const { mutate: updateLikeMutate } = useMutation({
    mutationKey: [QUERY_KEYS.POSTS],
    mutationFn: updateLikedUsers
  });

  return { updateLikeMutate };
}

export default usePostsQuery;
