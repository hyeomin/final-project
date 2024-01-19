import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';
import { getComments } from '../../../api/commentApi';
import defaultUserProfile from '../../../assets/defaultImg.jpg';
import MangoLogo from '../../../assets/mangoLogo(2).png';
import { useModal } from '../../../hooks/useModal';
// import { foundDetailPostProps } from '../../../pages/Detail';
import { QUERY_KEYS } from '../../../query/keys';
import useCommentQuery from '../../../query/useCommentQuery';
import { auth } from '../../../shared/firebase';
import theme from '../../../styles/theme';
// import { FoundDetailPostType } from '../../../types/PostType';
import { FoundDetailPostProps } from '../../../types/PostType';
import { getFormattedDate } from '../../../util/formattedDateAndTime';

const CommentList = ({ foundDetailPost }: FoundDetailPostProps) => {
  const modal = useModal();
  const queryClient = useQueryClient();
  const postId = foundDetailPost?.id;

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

    // console.log('id==>', id);
    // const confirm = window.confirm('정말로 삭제하시겠습니까?');
    // if (!confirm) return;
    // deleteCommentMutate(
    //   { id, postId: foundDetailPost.id },
    //   {
    //     onSuccess: () => {
    //       queryClient.invalidateQueries({
    //         queryKey: [QUERY_KEYS.COMMENTS]
    //       });
    //     }
    //   }
    // );
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

    //const confirm = window.confirm('저장하시겠습니까?');
    //if (!confirm) return;
    // updateCommentMutate(
    //   { postId: foundDetailPost.id, id, editingText },
    //   {
    //     onSuccess: () => {
    //       queryClient.invalidateQueries({
    //         queryKey: [QUERY_KEYS.COMMENTS]
    //       });
    //     }
    //   }
    // );

    //setEditingCommentId(null);
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
        // <CommenPlaceHolder>
        <SingleComment>
          <Mango src={MangoLogo} alt="Mango Logo" />
          <CommentDetail>
            <NameAndTime>
              <span>망고지기</span>
            </NameAndTime>
            <Content> &nbsp;아직 댓글이 없습니다. 첫 번째로 댓글을 남겨보세요!</Content>
          </CommentDetail>
        </SingleComment>
      ) : (
        // </CommenPlaceHolder>
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
const CommenPlaceHolder = styled.div`
  width: 100%;
  height: 100px;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const SingleComment = styled.div`
  display: flex;
  column-gap: 20px;
  border-bottom: 1px solid ${theme.color.lightgray};
  padding: 40px 0;

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
  & textarea {
    resize: none;
    outline: none;
    height: 100px;
    border: 1px solid ${theme.color.lightgray};
    border-radius: 5px;
    padding: 10px;
  }
`;

const NameAndTime = styled.div`
  display: flex;
  column-gap: 20px;
  font-weight: bold;
`;

const Time = styled.span`
  color: ${theme.color.gray};
  font-weight: normal;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: baseline;

  & button {
    background-color: transparent;
    border-color: transparent;
    color: ${theme.color.gray};

    &:hover {
      text-decoration: underline;
      cursor: pointer;
      color: ${theme.color.mangoMain};
    }
  }
`;

const Content = styled.div`
  display: flex;
`;

const Mango = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: rotate(340deg);
`;

export default CommentList;
