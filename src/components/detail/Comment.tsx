import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';
import { getComments, getUserData } from '../../api/detailApi';
import defaultUserProfile from '../../assets/defaultImg.jpg';
import useCommentQuery from '../../query/useCommentQuery';
import { QUERY_KEYS } from '../../query/keys';
import { getFormattedDate } from '../../util/formattedDateAndTime';

type Props = {
  post: PostType;
};
const Comment = ({ post }: Props) => {
  const [content, setContent] = useState('');

  // 작성자 아바타 가져오기
  const { data: currentUser } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData
  });
  const postId = post?.id;

  // 댓글목록 가져오기
  const { data: comments } = useQuery({
    queryKey: [QUERY_KEYS.COMMENTS],
    queryFn: () => getComments(postId)
  });

  console.log('댓글 목록 ===>', comments);

  const userProfile = currentUser?.profileImg;
  const { addCommentMutate, updateCommentMutate, deleteCommentMutate } = useCommentQuery();

  // 이벤트 핸들러
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

  // 댓글 등록
  const onSubmitNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return;

    const newComment = {
      uid: currentUser.uid,
      displayName: currentUser.displayName,
      profileImg: currentUser.profileImg,
      createdAt: Date.now(),
      content
    };
    addCommentMutate({ newComment, postId: post.id });
    setContent('');
    alert('등록되었습니다.')
  };

  //댓글 삭제
  const onClickDeleteButton = (id: string) => {
    console.log('id==>', id)
    const confirm = window.confirm('정말로 삭제하시겠습니까?')
    if(!confirm) return;
    deleteCommentMutate({id, postId: post.id})
  };

  //댓글 수정
  const onClickUpdateButton = (id: string) => {
    const confirm = window.confirm('저장하시겠습니까?')
    if(!confirm) return;
    // updateCommentMutate()
  };

  return (
    <Container>
      <div>
        <form onSubmit={onSubmitNewComment}>
          <input value={content} onChange={onChangeContent} type="text" />
          <button type="submit">등록하기</button>
        </form>
      </div>
      <CommentList>
        {comments?.map((comment) => {
          return (
            <Card key={comment.id}>
              <CommentDetail>
                <ProfileImg>
                  <img src={userProfile || defaultUserProfile} alt="profile" />
                </ProfileImg>
                <NameAndTime>
                  <span>{comment.displayName}</span>
                  <span>{getFormattedDate(comment.createdAt)}</span>
                </NameAndTime>
                <Buttons>
                  <button onClick={() => onClickUpdateButton(comment.id)}>수정</button>
                  <button onClick={() => onClickDeleteButton(comment.id)}>삭제</button>
                </Buttons>
              </CommentDetail>
              <Content>{comment.content}</Content>
            </Card>
          );
        })}
      </CommentList>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px;
  border: 1px solid black;
`;

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

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: aliceblue; */
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: red; */
  width: 700px;
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

export default Comment;
