import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { downloadImageURL, getPosts } from '../api/homeApi';
import Comment from '../components/detail/Comment';
<<<<<<< HEAD
import DetailBody from '../components/detail/DetailBody';
import { QUERY_KEYS } from '../query/keys';
import CS from './CommonStyle';
=======
import defaultCover from '../assets/defaultCoverImg.jpeg'

>>>>>>> f9c6d76296933b663a2f640c79571b21118b5760

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

  //해당 게시물 coverImage URL
  const {
    data: imageUrl,
    isLoading,
    error
  } = useQuery({
    queryKey: ['imageUrl',  post?.id],
    queryFn: () => downloadImageURL(post?.id!),
    enabled: !!post?.id
  });

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
  }, [id, posts, navigate, imageUrl ]);

  //커버이미지 로딩
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading image</div>;
  }


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
    <CS.FullContainer>
      <PostContainer>
        <CoverImageContainer>
          <div>{imageUrl ? <img src={imageUrl} alt="Post Cover" />: <img src={defaultCover} alt="default cover" />}</div>
          <div>
            <button onClick={onClickPrevButton} type="button">
              prev
            </button>
            <button onClick={onClickNextButton} type="button">
              next
            </button>
          </div>
        </CoverImageContainer>
        <DetailBody post={post!} />
      </PostContainer>
      <Comment post={post!} />
    </CS.FullContainer>
  );
}

export default Detail;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  row-gap: 20px;
  background-color: #b8ed8c;
  & div {
    background-color: pink;
  }
`;

const CoverImageContainer = styled.div`
  display: flex;
  position: relative;
  background-color: pink;
  width: 100%;
  height: 300px;

  & div {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 500px;
    background-color: lightblue;
  }
`;
