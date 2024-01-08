import { useMutation } from '@tanstack/react-query';

import { QUERY_KEYS } from './keys';
import { addPost } from '../api/posts';

function usePostsQuery() {
  const { mutate: addMutate } = useMutation({
    mutationKey: ['test'],
    mutationFn: addPost
  });


  return { addMutate };
}

export default usePostsQuery;
