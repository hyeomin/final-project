import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { QUERY_KEYS } from './keys';
import { addComment, deleteComment, updateComment } from '../api/detailApi';

const useCommentQuery = () => {
  const {mutate: addCommentMutate} = useMutation({
    mutationKey: [QUERY_KEYS.COMMENTS],
    mutationFn: addComment
  })

  const {mutate: updateCommentMutate} = useMutation({
    mutationKey: [QUERY_KEYS.COMMENTS],
    mutationFn: updateComment
    })

  const {mutate: deleteCommentMutate} = useMutation({
    mutationKey: [QUERY_KEYS.COMMENTS],
    mutationFn: deleteComment
  })

  return { addCommentMutate, updateCommentMutate, deleteCommentMutate}
}

export default useCommentQuery