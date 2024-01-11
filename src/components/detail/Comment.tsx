import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';
import { getUserData } from '../../api/detailApi';
import defaultUserProfile from '../../assets/defaultImg.jpg';
import useCommentQuery from '../../query/useCommentQuery';
import { QUERY_KEYS } from '../../query/keys';

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

  // 댓글목록 가져오기
  const {data: comments} = useQuery({
    queryKey: [QUERY_KEYS.COMMENTS],
    
  })

  const userProfile = currentUser?.profileImg;
  const { addCommentMutate } = useCommentQuery();

  // 이벤트 핸들러
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

  // 댓글 등록
  const onSubmitNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return;

    const newComment = {
      uid: currentUser.uid,
      profileImg: currentUser.profileImg,
      createdAt: Date.now()
    };
    addCommentMutate({ newComment, postId: post.id });
  };
  return (
    <Container>
      <div>
        <ProfileImg>
          <img src={userProfile || defaultUserProfile} alt="profile" />
        </ProfileImg>
        <form onSubmit={onSubmitNewComment}>
          <input value={content} onChange={onChangeContent} type="text" />
          <button type="submit">등록하기</button>
        </form>
      </div>
      <div>


      </div>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  align-items: center;
  padding: 20px;
  margin: 20px;
  border: 1px solid black;
`;

const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export default Comment;
