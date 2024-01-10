import styled from 'styled-components';
import DetailBody from '../components/detail/DetailBody';
import CS from './CommonStyle';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../query/keys';
import { downloadImageURL, getPosts } from '../api/homeApi';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Detail() {
  //인덱스 넘버로 페이지 관리
  const [page, setPage] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  const { data: posts } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });

  // post 정보
  const post = posts?.find((post) => post.id === id);
  console.log('post ===>', post);

  //해당 게시물 coverImage URL
  const {
    data: imageUrl,
    isLoading,
    error
  } = useQuery({
    queryKey: ['imageUrl'],
    queryFn: () => downloadImageURL(post?.id!),
    enabled: !!post?.id
  });

// 현재 페이지 인덱스로 page 상태 변경
useEffect(() => {
  if (posts) {
    const postIndex = posts.findIndex((post) => post.id === id);
    setPage(postIndex); // 현재 post의 인덱스 설정
  }
}, [id, posts]);

if (isLoading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error loading image</div>;
}

//흠 페이지가 바껴도 리렌더링이 안 됨..

//prev 버튼
  const onClickPrevButton = () => {
  if (posts && page > 0) {
    const prevPostId = posts[page - 1].id;
    navigate(`/detail/${prevPostId}`);
    setPage(page - 1);
  } else {
    // 첫 페이지일 경우 얼럿
    alert("이미 첫 번째 게시물입니다.");
  }
};

//next 버튼
const onClickNextButton = () => {
  if (posts && page < posts.length - 1) {
    const nextPostId = posts[page + 1].id;
    navigate(`/detail/${nextPostId}`);
    setPage(page + 1); 
  } else {
    // 마지막 페이지일 경우 얼럿
    alert("마지막 게시물입니다.");
  }
};


  return (
    <CS.FullContainer>
      <PostContainer>
        <CoverImageContainer>
          <div>{imageUrl && <img src={imageUrl} alt="Post Cover" />}</div>
          <div>
            <button onClick={onClickPrevButton} type="button">
              prev
            </button>
            <button onClick={onClickNextButton} type="button">
              next
            </button>
          </div>
        </CoverImageContainer>
        <DetailBody />
      </PostContainer>
    </CS.FullContainer>
  );
}

export default Detail;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  & div {
    background-color: pink;
  }
`;

const CoverImageContainer = styled.div`
  display: flex;
  position: relative;
  background-color: pink;

  & div {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100%;

    background-color: lightblue;
  }
`;
