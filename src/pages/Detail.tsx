import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { updatePostViewCount } from '../api/detailApi';
import { getPosts } from '../api/homeApi';
import DetailBody from '../components/detail/DetailBody';
import PostShift from '../components/detail/PostShift';
import AddCommentForm from '../components/detail/comment/AddComment';
import CommentList from '../components/detail/comment/CommentList';
import DetailHeader from '../components/detail/detailHeader/DetailHeader';
import { QUERY_KEYS } from '../query/keys';
import { postInputState } from '../recoil/posts';
import { PostType } from '../types/PostType';

function Detail() {
  const [foundDetailPost, setFoundDetailPost] = useState<PostType | null>();
  const [postInput, setPostInput] = useRecoilState(postInputState);

  console.log('postInput', postInput);

  const { id } = useParams();

  const { data: postList, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });

  useEffect(() => {
    if (postList) {
      const foundDetailPost = postList.find((post) => post.id === id);
      if (foundDetailPost) setFoundDetailPost(foundDetailPost);
    }
  }, [postList, id]);

  //조회수 업데이트
  const [viewCount, setViewCount] = useState(foundDetailPost?.viewCount || 0);
  useEffect(() => {
    if (foundDetailPost && !sessionStorage.getItem(`viewed-${foundDetailPost.id}`)) {
      updatePostViewCount(foundDetailPost.id);
      sessionStorage.setItem(`viewed-${foundDetailPost.id}`, 'true');
      setViewCount((prevCount) => prevCount + 1);
    }
  }, [postList, foundDetailPost]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 포스트 존재 여부 검사
  // if (posts) {
  // 해당 아이디를 가진 post가 존재하는지 확인
  // const validatePostId = posts.some((post) => post.id === id);
  // if (!id || !validatePostId) {
  //   alert('존재하지 않는 게시물입니다.');
  //   navigate('/'); // 홈으로 이동
  //   return;
  // }

  return (
    <Container>
      {foundDetailPost && (
        <>
          <DetailHeader foundDetailPost={foundDetailPost} />
          <DetailBody foundDetailPost={foundDetailPost} />
          <AddCommentForm foundDetailPost={foundDetailPost} />
          <CommentList foundDetailPost={foundDetailPost} />
          <PostShift postList={postList} postId={id} />
        </>
      )}
      <DetailEmptyFooter></DetailEmptyFooter>
    </Container>
  );
}

export default Detail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const DetailEmptyFooter = styled.div`
  height: 280px;
`;
