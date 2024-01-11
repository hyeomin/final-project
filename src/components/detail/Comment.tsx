import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';
import { getUserData } from '../../api/detailApi';
import defaultUserProfileImg from '../../assets/defaultImg.jpg';

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

  const userProfileImg = currentUser?.profileImg;

  // 이벤트 핸들러
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

  // 코멘트 등록
  const onSubmitNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`${content}`);
  };
  return (
    <Container>
      <ProfileImg>
        <img src={userProfileImg || defaultUserProfileImg} alt="profile image" />
      </ProfileImg>
      <form onSubmit={onSubmitNewComment}>
        <input value={content} onChange={onChangeContent} type="text" />
        <button type="submit">등록하기</button>
      </form>
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
