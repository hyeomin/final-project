import { useMutation } from '@tanstack/react-query';
import { updateLikedUsers } from '../api/homeApi';
import { QUERY_KEYS } from './keys';

function usePostsQuery() {
  const { mutate: updateMutate } = useMutation({
    mutationKey: [QUERY_KEYS.POSTS],
    mutationFn: updateLikedUsers
  });

  return { updateMutate };
}

export default usePostsQuery;
