import React, { useState } from 'react';
import { auth } from '../../../shared/firebase';
import useCommentQuery from '../../../query/useCommentQuery';

type Props = {
    post: PostType;
  };

const AddCommentForm = ({ post }: Props) => {
    const currentUser = auth.currentUser;
    console.log('auth 유저정보', currentUser)

    const [content, setContent] = useState('');

    const { addCommentMutate } = useCommentQuery();
      // 이벤트 핸들러
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

    // 댓글 등록
    const onSubmitNewComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!currentUser) return;
    
        const newComment = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          createdAt: Date.now(),
          content
        };
        addCommentMutate({ newComment, postId: post.id });
        setContent('');
        alert('등록되었습니다.');
      };
    
  return (
    <div>
      <form onSubmit={onSubmitNewComment}>
        <input value={content} onChange={onChangeContent} type="text" />
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
};

export default AddCommentForm;
