import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { getAllUsers } from '../../../../api/authApi';
import { getComments } from '../../../../api/commentApi';
import defaultUserProfile from '../../../../assets/defaultImg.jpg';
import MangoLogo from '../../../../assets/realMango.png';
import { AuthContext } from '../../../../context/AuthContext';
import { useModal } from '../../../../hooks/useModal';
import { QUERY_KEYS } from '../../../../query/keys';
import useCommentQuery from '../../../../query/useCommentQuery';
import { FoundDetailPostProps } from '../../../../types/PostType';
import { getFormattedDate } from '../../../../util/formattedDateAndTime';
import St from './style';
import UserDetail from '../../../main/UserDetail';

const CommentList = ({ foundDetailPost, isLoading }: FoundDetailPostProps) => {
  const modal = useModal();
  const queryClient = useQueryClient();
  const postId = foundDetailPost?.id;

  const [editingText, setEditingText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const authContext = useContext(AuthContext);
  const currentUserId = authContext?.currentUser?.uid;

  // 댓글목록 가져오기
  const { data: comments } = useQuery({
    queryKey: [QUERY_KEYS.COMMENTS, postId],
    queryFn: () => getComments(postId),
    staleTime: Infinity
  });

  //mutates
  const { updateCommentMutate, deleteCommentMutate } = useCommentQuery();

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => setEditingText(e.target.value);

  //댓글 삭제
  const onClickDeleteButton = (id: string) => {
    const onClickCancel = () => {
      modal.close();
    };

    const onClickSave = () => {
      deleteCommentMutate(
        { id, postId: foundDetailPost.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEYS.COMMENTS]
            });
            modal.close();
          }
        }
      );
    };

    const openModalParams: Parameters<typeof modal.open>[0] = {
      title: '정말로 삭제하시겠습니까?',
      message: '',
      leftButtonLabel: '취소',
      onClickLeftButton: onClickCancel,
      rightButtonLabel: '확인',
      onClickRightButton: onClickSave
    };
    modal.open(openModalParams);
  };

  //댓글 수정완료
  const onClickUpdateButton = (id: string) => {
    const onClickCancel = () => {
      modal.close();
    };

    const onClickSave = () => {
      updateCommentMutate(
        { postId: foundDetailPost.id, id, editingText },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEYS.COMMENTS]
            });

            modal.close();
            setEditingCommentId(null);
          }
        }
      );
    };

    const openModalParams: Parameters<typeof modal.open>[0] = {
      title: '저장하시겠습니까?',
      message: '',
      leftButtonLabel: '취소',
      onClickLeftButton: onClickCancel,
      rightButtonLabel: '확인',
      onClickRightButton: onClickSave
    };
    modal.open(openModalParams);
  };

  // 수정버튼 클릭 ==> 수정모드
  const onClickEditModeButton = (id: string) => {
    setEditingCommentId(id);
  };

  //취소버튼
  const onClickCancelButton = () => {
    setEditingCommentId(null);
  };

  return (
    <St.CommentListContainer>
      {comments?.length === 0 ? (
        <St.SingleComment>
          <St.Mango src={MangoLogo} alt="Mango Logo" />
          <St.CommentDetail>
            <St.NameAndTime>
              <span>망고지기</span>
            </St.NameAndTime>
            <St.Content> &nbsp;아직 댓글이 없습니다. 첫 번째로 댓글을 남겨보세요!</St.Content>
          </St.CommentDetail>
        </St.SingleComment>
      ) : (
        comments?.map((comment) => {
          return (
            <St.SingleComment key={comment.id}>
              <UserDetail userId={comment.uid} type="profileImg" />
              <St.CommentDetail>
                <St.NameAndTime>
                  {/* <span>{comment.displayName}</span> */}
                  <UserDetail userId={comment.uid} type="displayName" />
                  <St.Time>{getFormattedDate(comment.createdAt)}</St.Time>
                </St.NameAndTime>
                {editingCommentId === comment.id ? (
                  <textarea defaultValue={comment.content} onChange={(e) => onChangeTextArea(e)} />
                ) : (
                  <St.Content>{comment.content}</St.Content>
                )}
              </St.CommentDetail>
              {currentUserId === comment.uid && (
                <>
                  {editingCommentId === comment.id ? (
                    <St.ButtonContainer>
                      <button onClick={() => onClickUpdateButton(comment.id)}>저장</button>
                      <button onClick={onClickCancelButton}>취소</button>
                    </St.ButtonContainer>
                  ) : (
                    <St.ButtonContainer>
                      <button onClick={() => onClickEditModeButton(comment.id)}>수정</button>
                      <button onClick={() => onClickDeleteButton(comment.id)}>삭제</button>
                    </St.ButtonContainer>
                  )}
                </>
              )}
            </St.SingleComment>
          );
        })
      )}
    </St.CommentListContainer>
  );
};

export default CommentList;
