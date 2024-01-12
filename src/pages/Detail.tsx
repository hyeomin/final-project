import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts } from '../api/homeApi';
import CoverImage from '../components/detail/CoverImage';
import DetailBody from '../components/detail/DetailBody';
import Comment from '../components/detail/comment/Index';
import { QUERY_KEYS } from '../query/keys';

function Detail() {
  //인덱스 넘버로 페이지 관리
  const [postIndexNumber, setPostIndexNumber] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  const { data: posts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });

  // post 정보
  const post = posts?.find((post) => post.id === id);
  // console.log('post ===>', post);

  // 해당 게시물 coverImage URL
  // const {
  //   data: imageUrl,
  //   isLoading,
  //   error
  // } = useQuery({
  //   queryKey: ['imageUrl', post?.id],
  //   queryFn: () => downloadImageURL(post?.id!),
  //   enabled: !!post?.id
  // });

  // 현재 페이지 인덱스로 page 상태 변경
  useEffect(() => {
    if (posts) {
      // 해당 아이디를 가진 post가 존재하는지 확인
      // const validatePostId = posts.some((post) => post.id === id);
      // if (!id || !validatePostId) {
      //   alert('존재하지 않는 게시물입니다.');
      //   navigate('/'); // 홈으로 이동
      //   return;
      // }

      const postIndex = posts.findIndex((post) => post.id === id);
      setPostIndexNumber(postIndex); // 현재 post의 인덱스 설정
    }

    console.log('현재 post의 인덱스 넘버', postIndexNumber);
  }, [id, posts, navigate]);

  //prev 버튼
  const onClickPrevButton = () => {
    if (posts && postIndexNumber > 0) {
      const prevPostId = posts[postIndexNumber - 1].id;
      navigate(`/detail/${prevPostId}`);
      setPostIndexNumber(postIndexNumber - 1);
    } else {
      // 첫 페이지일 경우 얼럿
      alert('이미 첫 번째 게시물입니다.');
    }
  };

  //next 버튼
  const onClickNextButton = () => {
    if (posts && postIndexNumber < posts.length - 1) {
      const nextPostId = posts[postIndexNumber + 1].id;
      navigate(`/detail/${nextPostId}`);
      setPostIndexNumber(postIndexNumber + 1);
    } else {
      // 마지막 페이지일 경우 얼럿
      alert('마지막 게시물입니다.');
    }
  };

  return (
    <DetailPostContainer>
      <CoverImage post={post!} />
      <div>
        <button onClick={onClickPrevButton} type="button">
          이전 게시물
        </button>
        <button onClick={onClickNextButton} type="button">
          다음 게시물
        </button>
      </div>
      <DetailBody post={post!} />
      <Comment post={post!} />
    </DetailPostContainer>
  );
}

export default Detail;

const DetailPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: 100vh; */
  row-gap: 20px;
  background-color: #b8ed8c;
  & div {
    background-color: pink;
  }
`;
