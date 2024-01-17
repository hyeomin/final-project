import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';
import { getComments } from '../../../api/commentApi';
import defaultUserProfile from '../../../assets/defaultImg.jpg';
import { FoundPostProps } from '../../../pages/Detail';
import { QUERY_KEYS } from '../../../query/keys';
import useCommentQuery from '../../../query/useCommentQuery';
import { auth } from '../../../shared/firebase';
import theme from '../../../styles/theme';
import { getFormattedDate } from '../../../util/formattedDateAndTime';

const CommentList = ({ foundPost }: FoundPostProps) => {
  const queryClient = useQueryClient();
  const postId = foundPost?.id;

  const [editingText, setEditingText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const currentUser = auth.currentUser;

  // 댓글목록 가져오기
  const { data: comments } = useQuery({
    queryKey: [QUERY_KEYS.COMMENTS, postId],
    queryFn: () => getComments(postId)
  });

  //mutates
  const { updateCommentMutate, deleteCommentMutate } = useCommentQuery();

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => setEditingText(e.target.value);

  //댓글 삭제
  const onClickDeleteButton = (id: string) => {
    console.log('id==>', id);
    const confirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!confirm) return;
    deleteCommentMutate(
      { id, postId: foundPost.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.COMMENTS]
          });
        }
      }
    );
  };

  //댓글 수정완료
  const onClickUpdateButton = (id: string) => {
    const confirm = window.confirm('저장하시겠습니까?');
    if (!confirm) return;
    updateCommentMutate(
      { postId: foundPost.id, id, editingText },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.COMMENTS]
          });
        }
      }
    );
    setEditingCommentId(null);
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
    <CommentListContainer>
      {comments?.length === 0 ? (
        <div>첫번째 댓글의 주인공이 되어보세요!</div>
      ) : (
        comments?.map((comment) => {
          return (
            <SingleComment key={comment.id}>
              <img src={comment.photoURL || defaultUserProfile} alt="profile" />
              <CommentDetail>
                <NameAndTime>
                  <span>{comment.displayName}</span>
                  <Time>{getFormattedDate(comment.createdAt)}</Time>
                </NameAndTime>
                {editingCommentId === comment.id ? (
                  <textarea defaultValue={comment.content} onChange={(e) => onChangeTextArea(e)} />
                ) : (
                  <Content>{comment.content}</Content>
                )}
              </CommentDetail>

              {/* 유저 아이디가 달라서 버튼이 안보여요! */}
              {currentUser?.uid === comment.uid && (
                <>
                  {editingCommentId === comment.id ? (
                    <ButtonContainer>
                      <button onClick={() => onClickUpdateButton(comment.id)}>저장</button>
                      <button onClick={onClickCancelButton}>취소</button>
                    </ButtonContainer>
                  ) : (
                    <ButtonContainer>
                      <button onClick={() => onClickEditModeButton(comment.id)}>수정</button>
                      <button onClick={() => onClickDeleteButton(comment.id)}>삭제</button>
                    </ButtonContainer>
                  )}
                </>
              )}
            </SingleComment>
          );
        })
      )}
    </CommentListContainer>
  );
};

const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 14px;
`;

const SingleComment = styled.div`
  display: flex;
  column-gap: 20px;
  border-bottom: 1px solid ${theme.color.lightgray};
  padding: 40px 0;

  /* 
  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  } */

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const CommentDetail = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  flex: 1;
`;

const NameAndTime = styled.div`
  display: flex;
  column-gap: 20px;
  font-weight: bold;
`;

const Time = styled.span`
  color: ${theme.color.lightgray};
  font-weight: normal;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: baseline;

  & button {
    background-color: transparent;
    border-color: transparent;
    color: ${theme.color.lightgray};
  }
`;

const Content = styled.div`
  display: flex;
`;

export default CommentList;
