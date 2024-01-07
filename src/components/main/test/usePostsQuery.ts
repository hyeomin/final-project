import { useMutation } from '@tanstack/react-query';
import { addPost, deleteComment, deletePost, updatePost } from './posts';
import React from 'react';

function usePostsQuery() {
  const { mutate: addMutate} = useMutation({
    mutationKey: ['posts'],
    mutationFn: addPost
  });

  const { mutate: deleteMutate} = useMutation({
    mutationKey: ['posts'],
    mutationFn: deletePost
  });

  const {mutate: updateMutate} = useMutation({
    mutationKey: ['posts'],
    mutationFn: updatePost
  });

  const {mutate: deleteCommentMutate} = useMutation({
    mutationKey: ['posts'],
    mutationFn: deleteComment
  });



  return { addMutate, deleteMutate, updateMutate, deleteCommentMutate}
}

export default usePostsQuery ;
