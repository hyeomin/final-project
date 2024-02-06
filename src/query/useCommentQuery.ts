import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { QUERY_KEYS } from './keys';
import { addComment, deleteComment, updateComment } from 'api/commentApi';

const useCommentQuery = () => {
  const { mutate: addCommentMutate, error: addCommentError } = useMutation({
    mutationKey: [QUERY_KEYS.COMMENTS],
    mutationFn: addComment,
    onError: () => {
      console.log('댓글 추가 실패!', addCommentError);
    }
  });

  const { mutate: updateCommentMutate, error: updateCommentError } = useMutation({
    mutationKey: [QUERY_KEYS.COMMENTS],
    mutationFn: updateComment,
    onError: () => {
      console.log('댓글 수정 실패!', updateCommentError);
    }
  });

  const { mutate: deleteCommentMutate, error: deleteCommentError } = useMutation({
    mutationKey: [QUERY_KEYS.COMMENTS],
    mutationFn: deleteComment,
    onError: () => {
      console.log('댓글 삭제 실패!', deleteCommentError);
    }
  });

  return { addCommentMutate, updateCommentMutate, deleteCommentMutate };
};

export default useCommentQuery;
