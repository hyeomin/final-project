import { useMutation } from '@tanstack/react-query';

// import { QUERY_KEYS } from '../../../query/keys';
// import { addPost, deleteComment, deletePost, updatePost } from './posts';

// function usePostsQueryTest() {
//   const { mutate: addMutate } = useMutation({
//     mutationKey: [QUERY_KEYS.POSTS],
//     mutationFn: addPost
//   });

//   const { mutate: deleteMutate } = useMutation({
//     mutationKey: [QUERY_KEYS.POSTS],
//     mutationFn: deletePost
//   });

//   const { mutate: updateMutate } = useMutation({
//     mutationKey: [QUERY_KEYS.POSTS],
//     mutationFn: updatePost
//   });

//   const { mutate: deleteCommentMutate } = useMutation({
//     //mutation키를 바꿔야하나?
//     mutationKey: ["comments"],
//     mutationFn: deleteComment
//   });

//   return { addMutate, deleteMutate, updateMutate, deleteCommentMutate };
// }

// export default usePostsQueryTest;
