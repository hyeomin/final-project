import React, { useState } from 'react';
import { auth } from '../../../shared/firebase';
import { useQuery } from '@tanstack/react-query';
import { getComments } from '../../../api/commentApi';
import { QUERY_KEYS } from '../../../query/keys';
import useCommentQuery from '../../../query/useCommentQuery';
import styled from 'styled-components';
import { getFormattedDate } from '../../../util/formattedDateAndTime';
import defaultUserProfile from '../../../assets/defaultImg.jpg';

type Props = {
  post: PostType;
};
const CommentList = ({ post }: Props) => {
  const postId = post?.id;

  const [editingText, setEditingText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const currentUser = auth.currentUser;
  console.log('auth 유저정보', currentUser);

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
    deleteCommentMutate({ id, postId: post.id });
  };

  //댓글 수정완료
  const onClickUpdateButton = (id: string) => {
    const confirm = window.confirm('저장하시겠습니까?');
    if (!confirm) return;
    updateCommentMutate({ postId: post.id, id, editingText });
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
    <List>
      {comments?.length === 0 ? (
        <div>첫번째 댓글의 주인공이 되어보세요!</div>
      ) : (
        comments?.map((comment) => {
          return (
            <Card key={comment.id}>
              <CommentDetail>
                <ProfileImg>
                  <img src={comment.photoURL || defaultUserProfile} alt="profile" />
                </ProfileImg>
                <NameAndTime>
                  <span>{comment.displayName}</span>
                  <span>{getFormattedDate(comment.createdAt)}</span>
                </NameAndTime>
                {currentUser?.uid === comment.uid && (
                  <>
                    {editingCommentId === comment.id ? (
                      <Buttons>
                        <button onClick={() => onClickUpdateButton(comment.id)}>저장</button>
                        <button onClick={onClickCancelButton}>취소</button>
                      </Buttons>
                    ) : (
                      <Buttons>
                        <button onClick={() => onClickEditModeButton(comment.id)}>수정</button>
                        <button onClick={() => onClickDeleteButton(comment.id)}>삭제</button>
                      </Buttons>
                    )}
                  </>
                )}
              </CommentDetail>
              {editingCommentId === comment.id ? (
                <textarea defaultValue={comment.content} onChange={(e) => onChangeTextArea(e)} />
              ) : (
                <Content>{comment.content}</Content>
              )}
            </Card>
          );
        })
      )}
    </List>
  );
};

const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  background-color: aliceblue; // Detaill페이지 >PostContainer > &div 속성때문에 안먹는것.
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: red; */
  width: 500px;
  padding: 20px 10px 20px 10px;

  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
`;
const CommentDetail = styled.div`
  display: flex;
  align-items: center;
  /* background-color: cadetblue; */
`;
const NameAndTime = styled.div`
  display: flex;
  flex-direction: column;
`;

const Buttons = styled.div`
  margin: 0 0 auto auto;
`;

const Content = styled.div`
  display: flex;
  padding: 15px 0 0 10px;
`;

export default CommentList;
