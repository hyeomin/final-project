import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getComments } from '../../../api/commentApi';
import defaultUserProfile from '../../../assets/defaultImg.jpg';
import { QUERY_KEYS } from '../../../query/keys';
import useCommentQuery from '../../../query/useCommentQuery';
import { auth } from '../../../shared/firebase';
import theme from '../../../styles/theme';
import { getFormattedDate } from '../../../util/formattedDateAndTime';
import { useRecoilState } from 'recoil';
import {
  buttonClickedState,
  editingCommentIdState,
  editingTextState,
  publicModalState
} from '../../../recoil/useModal';
import Modal from '../../common/modal/Modal';
import { useModal } from '../../../hooks/useModal';

type Props = {
  foundPost: PostType;
};

const CommentList = ({ foundPost }: Props) => {
  const modal = useModal();
  const queryClient = useQueryClient();
  const postId = foundPost?.id;

  const [publicModal, setPublicModal] = useRecoilState(publicModalState);
  const [buttonClicked, setButtonClicked] = useRecoilState(buttonClickedState);
  console.log('buttonClicked (0)', buttonClicked);

  //useEffect (댓글수정로직,[상태가 바뀔때 확인하는,ButtonClicked ])
  //prev값을 넣어주기 (최근에 저장된 상태로 돌아가게)

  const [editingText, setEditingText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  // const [editingText, setEditingText] = useRecoilState(editingTextState);
  //const [editingCommentId, setEditingCommentId] = useRecoilState<string>(editingCommentIdState);

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

  //modal
  const openPublicModal = (title: string) => {
    setPublicModal({
      isUse: true,
      title,
      message: '',
      btnMsg: '취소',
      btnType: 'cancel',
      btnMsg2: '확인',
      btnType2: 'confirm'
    });
  };
  //댓글 수정완료
  const onClickUpdateButton = (id: string) => {
    const openModalParams: Parameters<typeof modal.open>[0] = {
      title: '테스트 타이틀',
      message: '테스트 메시지',
      leftButtonLabel: '왼쪽 버튼',
      onClickLeftButton: () => alert('왼쪽 버튼 눌렸어요~!'),
      rightButtonLabel: '오른쪽 버튼',
      onClickRightButton: () => {
        alert('오른쪽 버튼 눌렸어요~!');
        modal.close();
      }
    };
    modal.open(openModalParams);

    return;
    try {
      openPublicModal('저장하시겠습니까?');
      console.log('어떤 버튼이 눌렸는지?', buttonClicked); //1

      if (buttonClicked) {
        console.log('buttonClicked (2:true)', buttonClicked);
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
      }

      setEditingCommentId(null);
      //setButtonClicked(false);
    } catch (error) {
      console.log(error);
    } finally {
      setButtonClicked(false);
    }
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
