import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';
import { QUERY_KEYS } from '../../../query/keys';
import useCommentQuery from '../../../query/useCommentQuery';
import { auth } from '../../../shared/firebase';
import theme from '../../../styles/theme';
import Modal from '../../common/modal/Modal';
import { useRecoilState } from 'recoil';
import { publicModalState } from '../../../recoil/useModal';

type Props = {
  foundPost: PostType;
};

const AddCommentForm = ({ foundPost }: Props) => {
  const queryClient = useQueryClient();
  const currentUser = auth.currentUser;

  const [content, setContent] = useState('');

  const { addCommentMutate } = useCommentQuery();
  // 이벤트 핸들러
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

  //modal
  const [publicModal, setPublicModal] = useRecoilState(publicModalState);
  const openPublicModal = (title: string) => {
    setPublicModal({
      isUse: true,
      title,
      message: '',
      btnMsg: '',
      btnType: '',
      btnMsg2: '확인',
      btnType2: 'confirm'
    });
  };

  // 댓글 등록
  const onSubmitNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return;
    if (content.trim().length === 0) {
      openPublicModal('내용을 입력해주세요.');
      return;
    }
    const newComment = {
      uid: currentUser.uid,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      createdAt: Date.now(),
      content
    };

    addCommentMutate(
      { newComment, postId: foundPost.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.COMMENTS]
          });
        }
      }
    );
    setContent('');
    openPublicModal('등록되었습니다');
  };

  return (
    <CommentSubmitForm onSubmit={onSubmitNewComment}>
      {publicModal.isUse && <Modal />}
      <input value={content} onChange={onChangeContent} type="text" placeholder="댓글을 입력하세요." />
      <button type="submit">등록하기</button>
    </CommentSubmitForm>
  );
};

export default AddCommentForm;

const CommentSubmitForm = styled.form`
  display: flex;
  width: 100%;
  height: 60px;
  column-gap: 10px;

  & input {
    flex: 1;
    color: ${theme.color.gray};
    border: 1px solid #888;
    border-radius: 10px;
    background-color: #f6f6f6;
    font-size: 16px;
    padding: 0 20px;
  }

  & button {
    color: white;
    border: 1px solid #888;
    border-radius: 10px;
    background-color: ${theme.color.mangoMain};
    font-size: 16px;
    font-weight: bold;
    width: 100px;
  }
`;
