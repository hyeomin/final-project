import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { QUERY_KEYS } from './keys';
import { addComment } from '../api/detailApi';

const useCommentQuery = () => {
  const {mutate: addCommentMutate} = useMutation({
    mutationKey: [QUERY_KEYS.COMMENTS],
    mutationFn: addComment
  })

  const {mutate: updateCommentMutate} = useMutation({
    mutationKey: [QUERY_KEYS.COMMENTS],
    mutationFn: addComment
  })

  const {mutate: deleteCommentMutate} = useMutation({
    mutationKey: [QUERY_KEYS.COMMENTS],
    mutationFn: addComment
  })

  return { addCommentMutate}
}

export default useCommentQuery