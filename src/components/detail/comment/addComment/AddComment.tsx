import { useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../../hooks/useModal';
import { QUERY_KEYS } from '../../../../query/keys';
import useCommentQuery from '../../../../query/useCommentQuery';
import { auth } from '../../../../shared/firebase';
import { FoundDetailPostProps } from '../../../../types/PostType';
import St from './style';
import { AuthContext } from '../../../../context/AuthContext';

const AddCommentForm = ({ foundDetailPost }: FoundDetailPostProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;

  const modal = useModal();

  const [content, setContent] = useState('');

  const { addCommentMutate } = useCommentQuery();

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  // 댓글 등록
  const onSubmitNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return;
    if (content.trim().length === 0) {
      const onClickSave = () => {
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '내용을 입력해주세요.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
    } else {
      const newComment = {
        uid: currentUser.uid,
        createdAt: Date.now(),
        content
      };

      addCommentMutate(
        { newComment, postId: foundDetailPost.id, currentUserId: currentUser.uid },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEYS.COMMENTS]
            });
          }
        }
      );
      setContent('');

      const onClickSave = () => {
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '등록되었습니다.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
    }
  };

  // 로그인 여부 확인
  const onAuthCheckHandler = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (!currentUser) {
      const onClickCancel = () => {
        modal.close();
        return;
      };

      const onClickSave = () => {
        modal.close();
        navigate('/auth');
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '로그인이 필요합니다.',
        message: '로그인 창으로 이동하시겠습니까?',
        leftButtonLabel: '취소',
        onClickLeftButton: onClickCancel,
        rightButtonLabel: '로그인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);

      e.currentTarget.blur();
    }
  };

  return (
    <St.CommentSubmitForm onSubmit={onSubmitNewComment}>
      <textarea
        value={content}
        onChange={onChangeContent}
        onClick={onAuthCheckHandler}
        placeholder="댓글을 입력하세요.(최대 1,000자)"
        maxLength={1000}
        tabIndex={currentUser ? 0 : -1}
      />
      <St.SubmitButton type="submit">등록</St.SubmitButton>
    </St.CommentSubmitForm>
  );
};

export default AddCommentForm;
